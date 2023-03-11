# pep-it-companies-app

A simple platform for [@porqueeuprogramo](https://github.com/porqueeuprogramo) to improve streams' dynamic!

This platform has a total of 6 pages with an intuitive design for a simple but effective use.

## Setup

### .env file

- Go to the `api` folder and rename the file `.env.example` to `.env`
- Fill all the variables with the correct data to your local project and run the api

### How to run the api

```sh
cd api

docker compose up -d # to start the dockers containers

npm install # install dependencies

npx prisma migrate dev # migrations to db

npm run start # start the api
```

### How to run locally

```sh
cd frontend

npm install # install dependencies

npm run dev # start the frontend
```

## How to make imports

- Open [postman](https://www.postman.com/) or [insomnia](https://insomnia.rest/)

- Do an `HTTP` request using `GET` method to `http://localhost:port/migrate`

## Requests collection

To see the endpoints created I recommend you to install [Insomnia](https://insomnia.rest/) and import the file `requests.json` located inside the api folder, which was previously exported from Insomnia, or check the [API readme](https://github.com/assebc/pep-it-companies-app/tree/main/api).

## Examples and Structure

### Login and Forgot Password page

Composed by a simple `form` with just the required fields to `login` or `change password` from an account.

<details>
<summary><b>Screenshots<b></summary>

![](.github/assets/login.png) ![](.github/assets/forgotpassword.png)

</details>

### Companies List page

In the below images we can see the `main page` of the `platform` where it's distiguished by the `user` being `authenticated` or not. It's simply composed by a `table` who fills the requirements to identify and give informations about certain `company`.

<details>
<summary><b>Screenshots<b></summary>

![](.github/assets/companieslist_guest.png) ![](.github/assets/companieslist_admin.png)

</details>

### Create and Edit Form page

To `create` or `edit` the informations about certain `company` you will resort this pages.

<details>
<summary><b>Screenshots<b></summary>

![](.github/assets/createform.png) ![](.github/assets/editform.png)

</details>
