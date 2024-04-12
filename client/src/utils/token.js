import axios from "axios";

class AuthenticationError extends Error {
	constructor(message) {
		super(message);
		this.name = "AuthenticationError";
	}
}

const baseAxios = axios.create({
	baseURL: "http://localhost:3000",
});

const getToken = async (username, password) => {
	console.log({ username, password });
	try {
		const res = await baseAxios.post(
			"/api/auth/login",
			{ username, password },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (res.status === 200) {
			return res.data;
		} else if (res.status === 403 || res.status === 401) {
			throw new AuthenticationError("Invalid credentials");
		}
	} catch (error) {
		if (error) console.error(error);
	}
};

const refreshToken = async (refreshToken) => {
	try {
		const res = await baseAxios.post("/api/auth/refresh", null, {
			headers: {
				Authorization: `Bearer ${refreshToken}`,
			},
		});

		if (res.status === 200) {
			return res.data;
		} else {
			throw new Error("Cannot refresh token");
		}
	} catch (error) {
		throw new AuthenticationError("Invalid refresh token");
	}
};

export { getToken, AuthenticationError };
