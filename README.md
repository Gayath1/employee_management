
## Screen Shots

### Profile Page
![alt text](https://github.com/Gayath1/employee_management/blob/main/public/ScreenShots/Web%20capture_23-5-2022_141541_localhost.jpeg)
### Google login page
![alt text](https://github.com/Gayath1/employee_management/blob/main/public/ScreenShots/Web%20capture_23-5-2022_14159_localhost.jpeg)
### Employee Regitser page
![alt text](https://github.com/Gayath1/employee_management/blob/main/public/ScreenShots/Web%20capture_23-5-2022_141610_localhost.jpeg)
### Employee View page
![alt text](https://github.com/Gayath1/employee_management/blob/main/public/ScreenShots/Web%20capture_23-5-2022_141626_localhost.jpeg)
### Employee Data Update model inside View
![alt text](https://github.com/Gayath1/employee_management/blob/main/public/ScreenShots/Web%20capture_23-5-2022_141641_localhost.jpeg)

## Demo Video

[HERE](https://github.com/Gayath1/employee_management/blob/main/public/Demo/Demo.mp4)

## API Documentation

[HERE](https://github.com/Gayath1/employee_management/blob/main/public/Api%20Document/Insomnia_2022-05-23.json)

## Demo Deployment

[HERE](https://employee-management-jade.vercel.app/)

## Setup Local Environment

Clone the repository <github repo link>


```sh
git clone https://github.com/Gayath1/employee_management.git
```

Change the project directory.

```sh
cd {your project folder}
```

Install dependencies using the following command.

```sh
npm install
```

Create .env.local file and add follwing variables
  
  ```sh
  MONGODB_URI
  DB_NAME
  GOOGLE_CLIENT_ID
  GOOGLE_CLIENT_SECRET
  NEXT_PUBLIC_SECRET
  ```

run the development server:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
  
## Request & Response Examples
  
### API Resources  
  
  - [GET /api/Employee/Get](#get-employees)
  - [GET /api/Employee/Designation](#get-designations)
  - [POST /api/Employee/Add](#post-EmployeeData) 
  
### GET /api/Employee/Get
  
Response body:
  ```
  {
	"message": [
		{
			"_id": "628b44e68dd2762df79d7a0d",
			"FirstName": "Gayath",
			"LastName": "chandula",
			"Birthday": "2022-05-18",
			"Address": [
				{
					"address": "194/24,magalegoda,veyangodasdf"
				},
				{
					"address": "popweyvd,asdasdhj,asdjalkdssf"
				}
			],
			"Contact": [
				{
					"contact": "0774335548"
				},
				{
					"address": "",
					"contact": "0774335523"
				}
			],
			"Department": "HR",
			"Designation": "HR director",
			"EmpId": "324df4",
			"Nic": "556644663v"
		}
	],
	"success": true
}
  ```
### GET /api/Employee/Designation
  
Response body:  
