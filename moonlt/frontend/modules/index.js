import modules from './tpl';
import row from './tpl/row.art';
class RenderModules {
  constructor(props) {
    this.config = {
      modules,
      pageData:[
        { type: 'row', template: 'row-full', modules: [
          [{ type: 'mod', template: 'Header' }]
        ] },
        { type: 'row', template: 'row-600-300', modules: [
          [{ type: 'mod', template: 'Banner' }, { type: 'mod', template: 'InfoFlow' }], 
          [{ type: 'mod', template: 'TextList' }]
        ] },
      ],
      lt: {}, // location信息
    }
  }
  render(props) {
    this.config.pageData = props.pageData;
    this.config.lt = props.lt;
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
      const modId = $(item).attr('mod-id');
      const template = _this.config.modules[templateType] ? new _this.config.modules[templateType]($(item)) : new _this.config.modules['NoTpl']($(item));
      const params = {
        category: _this.config.lt.category || '',
        articleId: _this.config.lt.articleId || '',
        modData: _this.findMod(modId) || {},
      };
      template.init(params);
    });
  }
  findMod(pModId) {
    const { pageData } = this.config;
    let finalItem = {};
    const findChild = (data) => {
      data.forEach((item) => {
        if (item.type && item.type === 'row') {
          findChild(item.modules);
        } else if (Array.isArray(item)) {
          item.forEach((item2) => {
            if (item2.type && item2.type === 'mod') {
              if (item2.modId === pModId) {
                finalItem = item2;
              }
            } else {
              findChild(item2);
            }
          })
        }
      })
    }
    findChild(pageData);
    return finalItem;
  }
}
window.Modules = new RenderModules();