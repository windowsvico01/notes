import index from './index.art';
import $ from 'jquery';
import './index.css';
class TextList {
    constructor(dom) {
        this.config = {
            dom,
        }
    }
    init(data) {
        if (data.modData.source === 'forum_sort') {
            this.getRootCategory((res) => {
                console.log(res);
                const list = res.forum;
                const tHtml = index({list});
                this.config.dom.html(tHtml);
                this.afterInit();
            })
        }
       
    }
    afterInit() {
        console.log('init TextList');
    }
    getRootCategory(cb) {
        const pathData = location.pathname.split('/');;
        const category = pathData[2] || '';
        $.post('/content/getForum', { key: category, sort_by: 'hot DESC', limit: 5 }, (res,err) => {
            console.log(res);
            if (res && res.code === 0) {
                cb(res.data);
            } else cb([]);
        })
    }
}
export default TextList;