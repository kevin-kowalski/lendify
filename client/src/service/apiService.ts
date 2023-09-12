import { LoginFormData } from "../components/auth/Login";
import { RegisterFormData } from "../components/auth/Register"
import { ProfileEditData } from "../components/profile/ProfileEdit";
import { Chat, ChatPreview, Collection, Item, Message, MessageToSend, User } from "../types/types";

const baseUrl = process.env.REACT_APP_BASE_URL;

/* Profile */

// Helper Function to get the userId
function getCookieValue(cookieName : string)  {
  const cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if the cookie starts with the provided name
    if (cookie.indexOf(cookieName + '=') === 0) {
      // Get the value of the cookie
      const cookieValue = cookie.substring(cookieName.length + 1);

      // Decode the cookie value
      const decodedValue = decodeURIComponent(cookieValue);

      // Return the decoded value
      return decodedValue;
    }
  }
  // Cookie not found
  return '';
}

// Heper function to get the auhtorization token to send with each request
function getToken() {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('_auth='))
    ?.split('=')[1];
}

export async function getUser(): Promise<User> {
  try{
    const userIdObject = getCookieValue('_auth_state');
    const parsedUserIdObject = JSON.parse(userIdObject);
    const userId = parsedUserIdObject._id;
    const token = getToken();
    const response = await fetch(`${baseUrl}/user/${userId}`, {
       headers: {
        'Authorization': `Bearer ${token}`
       }
    });

    const data = await response.json();

    if(!response.ok) {
      throw new Error (data.message);
    }

    return data;
  } catch (error){
    throw new Error('An error occured');
  }
}

export async function putUser(profileEditData : ProfileEditData) {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/user`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileEditData),
      credentials: 'include',
    });
    return await response.json();
  } catch (err) {
    console.log(err)
  }
}

export async function deleteUser() {
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'DELETE',
      credentials: 'include'
    });
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

/* Authentication */

export async function registerUser (registerFormData: RegisterFormData) {
  try{
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerFormData),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.log(err);
  };
};

export async function loginUser (loginFormData: LoginFormData) {
  try{
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginFormData),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.log(err);
  };
};

/* Collection */

export async function getAllCollections (): Promise<Collection[]> {
  try {
    // const token = getToken();
    const response = await fetch(`${baseUrl}/collection/all`, {
      headers: {
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function postNewCollection (itemName: string, itemIds: string[]): Promise<Item> {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/collection`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({itemName, itemIds}),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
};

export async function changeCollectionName (collectionName: string, collectionId: string): Promise<Item> {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/collection/${collectionId}/name`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({newName: collectionName}),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
};

  export async function addItemsToCollections (itemIds: string[], collectionIds: string[]): Promise<Item> {
    try {
      
      const token = getToken();
      const response = await fetch(`${baseUrl}/collection/addItems`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({itemIds, collectionIds}),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    }
    catch (err) {
      throw new Error('An error occured');
    }
  };

export async function deleteCollection (collectionId: string): Promise<Item> {
  try {
    const token = getToken();
          
    const response = await fetch(`${baseUrl}/collection/${collectionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function deleteItemsFromCollection (itemIds: string[], collectionId: string): Promise<Item> {
  try {
    const token = getToken();
          
    const response = await fetch(`${baseUrl}/collection/${collectionId}/removeitems`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({items: itemIds}),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

/* Item */

export async function getAllItems (): Promise<Item[]> {
  try {
    const token = getToken();
          
    const response = await fetch(`${baseUrl}/item/all`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function getItemsByCollection (id: string): Promise<Item[]> {
  try {
    const token = getToken();
          
    const response = await fetch(`${baseUrl}/item/all/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function getItemsDiscover (): Promise<Item[]> {
  try {
    const token = getToken();
          
    const response = await fetch(`${baseUrl}/item/all/discover`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function getItemsByQuery (query: string): Promise<Item[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const token = getToken();
          
    const response = await fetch(`${baseUrl}/search?query=${encodedQuery}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function getItemById (id: string): Promise<Item> {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/item/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function postItem (item: Item): Promise<Item> {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/item`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function putItemById (id: string, item: Item): Promise<Item> {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/item/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function putItemReserve (id: string): Promise<Chat> {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/item/${id}/reserve`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function receiveItemById (id: string) {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/item/${id}/receive`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function returnItemById (id: string) {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/item/${id}/return`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function cancelItemById (id: string) {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/item/${id}/cancel`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function deleteItem (id: string): Promise<Item> {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/item/${id}`, {
      headers:{
        'Authorization': `Bearer ${token}`,
      },
      method: 'DELETE',
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

/* Messaging */

export async function getAllChats (): Promise<ChatPreview[]> {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/inbox`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function getChatbyId (chatId: string | undefined): Promise<Chat> {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/inbox/${chatId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}

export async function deleteChat(chatId: string) {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/inbox/${chatId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.log(err)
  }
}

export async function postMessage (currentMessageData: MessageToSend, chatId: string) {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/inbox/${chatId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentMessageData),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.log(err);
  };
};

export async function putMessage(message: Message) {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}/inbox/message/${message.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.log(err)
  }
}