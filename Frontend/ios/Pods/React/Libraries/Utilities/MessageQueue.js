/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule MessageQueue
 */

/* eslint no-bitwise: 0 */

const BridgeProfiling = require('BridgeProfiling');
const ErrorUtils = require('ErrorUtils');
const JSTimersExecution = require('JSTimersExecution');
const ReactUpdates = require('ReactUpdates');

const invariant = require('invariant');
const keyMirror = require('keyMirror');
const stringifySafe = require('stringifySafe');

const MODULE_IDS = 0;
const METHOD_IDS = 1;
const PARAMS = 2;

const SPY_MODE = false;

const MethodTypes = keyMirror({
  local: null,
  remote: null,
  remoteAsync: null,
});

const guard = fn => {
  try {
    fn();
  } catch (error) {
    ErrorUtils.reportFatalError(error);
  }
};

class MessageQueue {
  constructor(remoteModules, localModules, customRequire) {
    this.RemoteModules = {};

    this._require = customRequire || require;
    this._queue = [[], [], []];
    this._moduleTable = {};
    this._methodTable = {};
    this._callbacks = [];
    this._callbackID = 0;

    [
      'processBatch',
      'invokeCallbackAndReturnFlushedQueue',
      'callFunctionReturnFlushedQueue',
      'flushedQueue',
    ].forEach(fn => (this[fn] = this[fn].bind(this)));

    this._genModules(remoteModules);
    localModules &&
      this._genLookupTables(
        localModules,
        this._moduleTable,
        this._methodTable,
      );

    if (__DEV__) {
      this._debugInfo = {};
      this._remoteModuleTable = {};
      this._remoteMethodTable = {};
      this._genLookupTables(
        remoteModules,
        this._remoteModuleTable,
        this._remoteMethodTable,
      );
    }
  }

  /**
   * Public APIs
   */
  processBatch(batch) {
    guard(() => {
      ReactUpdates.batchedUpdates(() => {
        batch.forEach(call => {
          const method =
            call.method === 'callFunctionReturnFlushedQueue'
              ? '__callFunction'
              : '__invokeCallback';
          guard(() => this[method].apply(this, call.args));
        });
        BridgeProfiling.profile('ReactUpdates.batchedUpdates()');
      });
      BridgeProfiling.profileEnd();
    });
    return this.flushedQueue();
  }

  callFunctionReturnFlushedQueue(module, method, args) {
    guard(() => this.__callFunction(module, method, args));
    return this.flushedQueue();
  }

  invokeCallbackAndReturnFlushedQueue(cbID, args) {
    guard(() => this.__invokeCallback(cbID, args));
    return this.flushedQueue();
  }

  flushedQueue() {
    BridgeProfiling.profile('JSTimersExecution.callImmediates()');
    guard(() => JSTimersExecution.callImmediates());
    BridgeProfiling.profileEnd();
    const queue = this._queue;
    this._queue = [[], [], []];
    return queue[0].length ? queue : null;
  }

  /**
   * "Private" methods
   */
  __nativeCall(module, method, params, onFail, onSucc) {
    if (onFail || onSucc) {
      if (__DEV__) {
        // eventually delete old debug info
        this._callbackID > 1 << 5 &&
          (this._debugInfo[this._callbackID >> 5] = null);

        this._debugInfo[this._callbackID >> 1] = [module, method];
      }
      onFail && params.push(this._callbackID);
      this._callbacks[this._callbackID++] = onFail;
      onSucc && params.push(this._callbackID);
      this._callbacks[this._callbackID++] = onSucc;
    }
    this._queue[MODULE_IDS].push(module);
    this._queue[METHOD_IDS].push(method);
    this._queue[PARAMS].push(params);
    if (__DEV__ && SPY_MODE && isFinite(module)) {
      console.log(
        `JS->N : ${this._remoteModuleTable[module]}.${
          this._remoteMethodTable[module][method]
        }(${JSON.stringify(params)})`,
      );
    }
  }

  __callFunction(module, method, args) {
    BridgeProfiling.profile(
      () => `${module}.${method}(${stringifySafe(args)})`,
    );
    if (isFinite(module)) {
      method = this._methodTable[module][method];
      module = this._moduleTable[module];
    }
    if (__DEV__ && SPY_MODE) {
      console.log(`N->JS : ${module}.${method}(${JSON.stringify(args)})`);
    }
    module = this._require(module);
    module[method](...args);
    BridgeProfiling.profileEnd();
  }

  __invokeCallback(cbID, args) {
    BridgeProfiling.profile(
      () => `MessageQueue.invokeCallback(${cbID}, ${stringifySafe(args)})`,
    );
    const callback = this._callbacks[cbID];
    if (__DEV__) {
      const debug = this._debugInfo[cbID >> 1];
      const module = debug && this._remoteModuleTable[debug[0]];
      const method = debug && this._remoteMethodTable[debug[0]][debug[1]];
      if (!callback) {
        console.error(
          `Callback with id ${cbID}: ${module}.${method}() not found`,
        );
      } else if (SPY_MODE) {
        console.log(
          `N->JS : <callback for ${module}.${method}>(${JSON.stringify(
            args,
          )})`,
        );
      }
    }
    this._callbacks[cbID & ~1] = null;
    this._callbacks[cbID | 1] = null;
    callback(...args);
    BridgeProfiling.profileEnd();
  }

  /**
   * Private helper methods
   */
  _genLookupTables(localModules, moduleTable, methodTable) {
    const moduleNames = Object.keys(localModules);
    for (let i = 0, l = moduleNames.length; i < l; i++) {
      const moduleName = moduleNames[i];
      const methods = localModules[moduleName].methods;
      const moduleID = localModules[moduleName].moduleID;
      moduleTable[moduleID] = moduleName;
      methodTable[moduleID] = {};

      const methodNames = Object.keys(methods);
      for (let j = 0, k = methodNames.length; j < k; j++) {
        const methodName = methodNames[j];
        const methodConfig = methods[methodName];
        methodTable[moduleID][methodConfig.methodID] = methodName;
      }
    }
  }

  _genModules(remoteModules) {
    const moduleNames = Object.keys(remoteModules);
    for (let i = 0, l = moduleNames.length; i < l; i++) {
      const moduleName = moduleNames[i];
      const moduleConfig = remoteModules[moduleName];
      this.RemoteModules[moduleName] = this._genModule({}, moduleConfig);
    }
  }

  _genModule(module, moduleConfig) {
    const methodNames = Object.keys(moduleConfig.methods);
    for (let i = 0, l = methodNames.length; i < l; i++) {
      const methodName = methodNames[i];
      const methodConfig = moduleConfig.methods[methodName];
      module[methodName] = this._genMethod(
        moduleConfig.moduleID,
        methodConfig.methodID,
        methodConfig.type,
      );
    }
    Object.assign(module, moduleConfig.constants);
    return module;
  }

  _genMethod(module, method, type) {
    if (type === MethodTypes.local) {
      return null;
    }

    let fn = null;
    const self = this;
    if (type === MethodTypes.remoteAsync) {
      fn = function(...args) {
        return new Promise((resolve, reject) => {
          self.__nativeCall(module, method, args, resolve, errorData => {
            const error = createErrorFromErrorData(errorData);
            reject(error);
          });
        });
      };
    } else {
      fn = function(...args) {
        const lastArg = args.length > 0 ? args[args.length - 1] : null;
        const secondLastArg =
          args.length > 1 ? args[args.length - 2] : null;
        const hasSuccCB = typeof lastArg === 'function';
        const hasErrorCB = typeof secondLastArg === 'function';
        hasErrorCB &&
          invariant(
            hasSuccCB,
            'Cannot have a non-function arg after a function arg.',
          );
        const numCBs = hasSuccCB + hasErrorCB;
        const onSucc = hasSuccCB ? lastArg : null;
        const onFail = hasErrorCB ? secondLastArg : null;
        args = args.slice(0, args.length - numCBs);
        return self.__nativeCall(module, method, args, onFail, onSucc);
      };
    }
    fn.type = type;
    return fn;
  }
}

function createErrorFromErrorData(errorData: ErrorData): Error {
  const { message, ...extraErrorInfo } = errorData;
  const error = new Error(message);
  error.framesToPop = 1;
  return Object.assign(error, extraErrorInfo);
}

module.exports = MessageQueue;
