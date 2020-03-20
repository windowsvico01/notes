import modules from './tpl';
import row from './tpl/row.art';
class RenderModules {
  constructor() {
    this.config = {
      modules,
      pageData:[
        { type: 'row', template: 'row-full', modules: [
          [{ type: 'mod', template: 'Header' }]
        ] },
        { type: 'row', template: 'row-600-300', modules: [
          [{ type: 'mod', template: 'Banner' }], 
          [{ type: 'mod', template: 'TextList' }]
        ] },
        { type: 'row', template: 'row-600-300', modules: [
          [{ type: 'mod', template: 'Banner' }], 
          [{ type: 'mod', template: 'TextList' }]
        ] },
        { type: 'row', template: 'row-600-300', modules: [
          [{ type: 'mod', template: 'Banner' }], 
          [{ type: 'mod', template: 'TextList' }]
        ] },
        { type: 'row', template: 'row-600-300', modules: [
          [{ type: 'mod', template: 'Banner' }], 
          [{ type: 'mod', template: 'TextList' }]
        ] },
        { type: 'row', template: 'row-600-300', modules: [
          [{ type: 'mod', template: 'Banner' }], 
          [{ type: 'mod', template: 'TextList' }]
        ] },
      ]
    }
  }
  render() {
    this.renderRow();
  }
  renderRow() {
    let tHtml = '';
    this.config.pageData.forEach((item) => {
      tHtml += row(item);
    })
    $('#app').html(tHtml);
    this.renderModules();
  }
  renderModules() {
    const moduleWrapper = $('.module-wrapper');
    const _this = this;
    moduleWrapper.length && moduleWrapper.each((index, item) => {
      const templateType = $(item).attr('template-type') || 'no-template';
      const template = _this.config.modules[templateType] ? new _this.config.modules[templateType]($(item)) : new _this.config.modules['NoTpl']($(item));
      template.init();
    });
  }
}
window.Modules = new RenderModules();