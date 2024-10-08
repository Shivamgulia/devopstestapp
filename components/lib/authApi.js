export async function signUp(props) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: props.username,
          name: props.name,
          password: props.password,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return { data, error: data.message };
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function passwordReset(email, password) {
  try {
    const response = await fetch("/api/auth/reset_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { data, error: data.message };
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
