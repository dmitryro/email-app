import { observable, action, runInAction } from 'mobx'

import { StoreExt } from '../../utils/reactExt'
import { tag } from '../../services/api'
import { templateapi } from '../../services/api'

export class TagStore extends StoreExt {
    /**
     * @memberof LogStore
     */

    @observable
    messageStyle = {"display":"box", "color": "red"};

    @observable
    addButton = null

    @observable
    sentMessage = "";

    @observable 
    template = null

    @observable
    component = undefined

    @observable
    selected = Array();

    @observable
    used = Array();


    /**
     *
     * @type {ITagStore.ITag[]}
     * @memberof TagStore
     */
    @observable
    tags: ITagStore.ITag[] = []
    /**
     *
     * @memberof TagStore
     */
    @action
    readTags = () => {
        try {
            var res  = tag.getTags();
            this.tags = res;
            return res; 
        } catch (err) {
            console.log("Failed fetching tags ..."+err);
        }
        runInAction('HIDE_LOG_LIST_LOADING', () => {
        })
    }

    @action
    fetchPayload = () => {
        var payload = {};
        var template = "";
        payload['values'] = [];

        for(var i=0; i<this.used.length; i++) {
            var entry = {};
            if (this.used[i].name) {
                entry[this.used[i].name] = this.used[i].value;
                payload['values'].push(entry);
            }
         
            if (this.used[i].value.includes('new_line') ||
                this.used[i].value.includes('[new_line]') ||
                this.used[i].value.includes('{new_line}')) {
               template += '<br/>\n\n';
            } else {
                if (this.used[i].type==='text') {
                    template += ` ${this.used[i].value}`;
                } else {
                    template += ` {{${this.used[i].name}}}`;
                }
            }
        }
        payload['template'] = template;
        return payload;
    }

    sendTemplate = async (template) => {
        var res = await templateapi.sendTemplate(template); 
        if (res['status']===200) {
               this.setSentMessage( "Sent the message!", {"display":"box", "color":"green"});
               setTimeout(this.resetIsSent, 1000);
        } else {
               this.setSentMessage("Failed sending message!", {"display":"box", "color":"red"});
               setTimeout(this.resetIsSent, 1000);
        }
    }

    @action
    setSentMessage = (m, style) => {
        this.messageStyle = style;
        this.sentMessage = m;
    }
    @action
    resetIsSent = () => {
        this.sentMessage = "";
        this.reset();
    }

    @action
    addSelected = (v) => {
        this.selected.push(v);
    }    

    addText = (v) => {
        v.type = 'text';
        this.used.push(v);
    }

    @action
    addUsed = (v) => {
        v.type = 'tag';
        this.used.push(v);
    }


    @action
    deleteUsed = (id) => {
        var deleted = [];
        for(var i=0; i<this.used.length; i++) {
            if (this.used[i].id !== id) {
                deleted.push(this.used[i]);
            }
        }
        this.used = deleted;
    }



    @action
    deleteSelected = (id) => {
        var deleted = [];
        for(var i=0; i<this.selected.length; i++) {
            if (this.selected[i].id !== id) {
                deleted.push(this.selected[i]);    
            }
        }
        this.selected = deleted;
    }

    @action
    reset = () => {
       this.used = [];
       this.template = null;
    }
   
    @action
    toggleUpdate = () => {
       console.log("Time to update ... ");
    }

    @action
    setComponent = (component) => {
       this.component = component
    }

    @action
    setTemplate = (template) => {
       this.template = template
    }
 
}
export default new TagStore()

