import index from './index.art';
import './index.css';
class TextList {
    constructor(dom) {
        this.config = {
            dom,
        }
    }
    init(data) {
        const tHtml = index(data);
        this.config.dom.html(tHtml);
        this.afterInit();
    }
    afterInit() {
        console.log('init TextList');
    }
}
export default TextList;