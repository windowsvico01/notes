import index from './index.art';
import './index.css';
console.log(index());
class Header {
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
        console.log('init');
    }
}
export default Header;