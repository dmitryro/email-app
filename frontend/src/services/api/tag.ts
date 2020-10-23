import client from '../../services/client'

var tagslist = Array();
tagslist.push({'id': 1, "value":"contact_first_name", "label":"Contact First Name"});
tagslist.push({'id': 2, "value":"email", "label": "Email"});
tagslist.push({'id': 3, "value":"discount_rate", "label": "Discount Rate"});
tagslist.push({'id': 4, "value":"discount_code", "label": "Discount Code"});
tagslist.push({'id': 5, "value":"to", "label": "To"});
tagslist.push({'id': 6, "value":"from", "label": "From"});

export default {
    getTags() {
        return tagslist;
    }
}
