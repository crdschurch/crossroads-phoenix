const components = {};

export function registerResolve(componentName, resolveFn) {
  if (resolveFn) {
    components[componentName] = resolveFn;
  }
}

  /* ngInject */
export function invokeResolve($state, $q, $injector) {
  if (components[$state.toParams.page]) {
    const promises = _.map(components[$state.toParams.page], fn => $injector.invoke(fn));
    return $q.all(promises);
  }
  return null;
}
