import RNFetchBlob from 'rn-fetch-blob';
import {baseUrl} from './constants';

export async function allAssignedContracts(token) {
    try {
        let feeds = await fetch(`${baseUrl}all_assigned_contract`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}



export async function getSingleContract(id, type) {
    console.log("Details sent",id, type)
    console.log(`${baseUrl}get_single_contract/${id}/${type}`)
    try {
        let feeds = await fetch(`${baseUrl}get_single_contract/${id}/${type}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}
// // view_all_messages
export async function viewAllMessages(userToken) {
    try {
        let feeds = await fetch(`${baseUrl}view_all_messages`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function viewSingleMessage(id,userToken) {
    try {
        let feeds = await fetch(`${baseUrl}view_single_msg/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function viewAllContracts() {
    try {
        let feeds = await fetch(`${baseUrl}view_all_contract`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function doSearchContract(formData) {   
    
    try {
        let feeds = await fetch(`${baseUrl}seach_contract`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        let result = await feeds.json();
        console.log("loggi", result)
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function doLogin(formData) {   
    
    try {
        let feeds = await fetch(`${baseUrl}login`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        let result = await feeds.json();
        console.log("loggi", result)
        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function uploadInspectionDatasheet(id, type) {
    try {
        let feeds = await fetch(`${baseUrl}upload_inspection_datasheet/${id}/${type}`);
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e)
    }
}

export async function getPostsByCategory(baseUrl, categoryId, pageId) {
    try {
        let feeds = await fetch(`${baseUrl}api/category/${categoryId}?page=${pageId}`);
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function fetchUserProfile(baseUrl, userToken) {
    try {
        let feeds = await fetch(`${baseUrl}api/user`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function fetchUserReferrals(baseUrl, userToken) {
    try {
        let feeds = await fetch(`${baseUrl}api/referrals`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function fetchUserEarnings(baseUrl, userToken) {
    try {
        let feeds = await fetch(`${baseUrl}api/earnings`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function fetchUserPayouts(baseUrl, userToken) {
    try {
        let feeds = await fetch(`${baseUrl}api/payouts`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function doPostComment(baseUrl, formData, token) {
    try {
        let feeds = await fetch(`${baseUrl}api/writeComment`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function doDeleteComment(baseUrl, id, token) {
    try {
        let feeds = await fetch(`${baseUrl}api/deleteComment/${id}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function fetchUserPosts(baseUrl, pageId, token) {
    try {
        let feeds = await fetch(`${baseUrl}api/user/posts?pageId=${pageId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}
//'Content-Type': 'multipart/form-data,octet-stream',
export async function createFilePost(baseUrl, token, payload){
    let link = `${baseUrl}api/writePost`
    
    RNFetchBlob.fetch('POST', link, {
        Authorization: `Bearer ${token}`,
        body: payload,
      
        'Content-Type' : 'application/octet-stream',
        })
    .then((response) => response.json())
    .then((RetrivedData) => {
      console.log(RetrivedData);
    })
    .catch((err) => {
    console.log("tis is the errr", err);
    })
}
/*

 try {
        let feeds = await fetch(`${baseUrl}api/editPost/${postId}`, {
            body: payload,
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn('--' + e.message)
    }
*/ 
export async function DatasheetPost(token, payload) {
    try{
        let feeds = await RNFetchBlob.fetch('POST', `${baseUrl}datasheet_post`, {
          
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
    
        }, payload)
        let result = await feeds.json();

        feeds = null;
        return result;
    }
    catch (e) {
        console.warn('--' + e.message)
    }
  
}



export async function updatePost(baseUrl, token, payload, postId) {
    // console.warn(baseUrl)
    // console.warn(token)
    console.warn(payload)
    // return
    try {
        let feeds = await fetch(`${baseUrl}api/editPost/${postId}`, {
            body: payload,
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn('--' + e.message)
    }
}

export async function deleteUserPost(baseUrl, token, id) {
  
    try {
        let feeds = await fetch(`${baseUrl}api/deletePost/${id}`, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn('--' + e.message)
    }
}