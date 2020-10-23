import client from '../../services/client'

export default {
    sendTemplate(data: object): Promise<any> {
        // Post a new site
        var templates = client.post('templates', data || {});
        return templates;
    },
}

