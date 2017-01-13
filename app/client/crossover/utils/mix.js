export default const mix = (superclass) => new MixinBuilder(superclass);

class MixinBuilder {  
  constructor(superclass) {
    this.superclass = superclass;
  }

  with(...mixins) { 
    return mixins.reduce((c, mixin) =>{return mixin(c)}, this.superclass);
  }
}