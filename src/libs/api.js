export const fetchOrder = async (order, rejectWithValue) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }
  catch (e) {
    return rejectWithValue(e.message);
  }
}

export const fetchProducts = async (categoryId, offset, searchString, rejectWithValue) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/items?categoryId=${categoryId}&offset=${offset}&q=${searchString}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return { data, categoryId, offset, searchString };
  }
  catch (e) {
    return rejectWithValue(e.message);
  }
}

export const fetchProduct = async (productId, rejectWithValue) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/items/${productId}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
  catch (e) {
    return rejectWithValue(e.message);
  }
}

export const fetchCategories = async (rejectWithValue) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
  catch (e) {
    return rejectWithValue(e.message);
  }
}

export const fetchTopSales = async (rejectWithValue) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/top-sales`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
  catch (e) {
    return rejectWithValue(e.message);
  }
}