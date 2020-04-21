all_properties = (obj) => {
  return Object.getOwnPropertyNames(obj.prototype);
};
console.log(all_properties(Zob));
console.log(all_properties(Zray));
console.log(all_properties(Number));
console.log(all_properties(String));