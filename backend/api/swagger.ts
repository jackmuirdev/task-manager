const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "Your API Documentation",
    "version": "1.0.0",
    "description": "API Documentation for your Node.js app"
  },
  "servers": [
    {
      "url": "http://localhost:10000",
      "description": "Local server"
    }
  ],
  "paths": {
    "/api/tasks": {
      "get": {
        "summary": "Retrieve all tasks",
        "description": "Retrieve a list of all tasks from the database.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "A list of tasks.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Task"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create a new task",
        "description": "Create a new task with the provided information.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewTask"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Task created successfully."
          },
          "400": {
            "description": "Bad request. Invalid task data."
          },
          "500": {
            "description": "Internal server error. Failed to create task."
          }
        }
      }
    },
    "/api/tasks/{id}": {
      "get": {
        "summary": "Get task by ID",
        "description": "Retrieve a specific task by its ID.",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "description": "ID of the task to retrieve.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Task found.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Task"
                }
              }
            }
          },
          "404": {
            "description": "Task not found."
          },
          "500": {
            "description": "Internal server error. Failed to retrieve task."
          }
        }
      },
      "put": {
        "summary": "Update task by ID",
        "description": "Update a specific task by its ID.",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "description": "ID of the task to update.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTask"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Task updated successfully."
          },
          "400": {
            "description": "Bad request. Invalid task data."
          },
          "404": {
            "description": "Task not found."
          },
          "500": {
            "description": "Internal server error. Failed to update task."
          }
        }
      },
      "delete": {
        "summary": "Delete task by ID",
        "description": "Delete a specific task by its ID.",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "description": "ID of the task to delete.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Task deleted successfully."
          },
          "404": {
            "description": "Task not found."
          },
          "500": {
            "description": "Internal server error. Failed to delete task."
          }
        }
      }
    },
    "/api/users": {
      "get": {
        "summary": "Retrieve all users",
        "description": "Retrieve a list of all users from the database.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "A list of users.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Register a new user",
        "description": "Register a new user with the provided information.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewUser"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User created successfully."
          },
          "400": {
            "description": "Bad request. Invalid user data."
          },
          "500": {
            "description": "Internal server error. Failed to register user."
          }
        }
      }
    },
    "/api/users/{id}": {
      "get": {
        "summary": "Get user by ID",
        "description": "Retrieve a specific user by their ID.",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "description": "ID of the user to retrieve.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "User found.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "404": {
            "description": "User not found."
          },
          "500": {
            "description": "Internal server error. Failed to retrieve user."
          }
        }
      },
      "delete": {
        "summary": "Delete user by ID",
        "description": "Delete a specific user by their ID.",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "description": "ID of the user to delete.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "User deleted successfully."
          },
          "404": {
            "description": "User not found."
          },
          "500": {
            "description": "Internal server error. Failed to delete user."
          }
        }
      }
    },
    "/api/users/login": {
      "post": {
        "summary": "User login",
        "description": "Login an existing user with their credentials.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginUser"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User logged in successfully.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserLoginResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized. Invalid credentials."
          },
          "500": {
            "description": "Internal server error. Failed to login user."
          }
        }
      }
    },
    "/api/users/logout": {
      "post": {
        "summary": "User logout",
        "description": "Logout the currently logged in user.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "User logged out successfully."
          },
          "500": {
            "description": "Internal server error. Failed to logout user."
          }
        }
      }
    },
    "/api/users/profile": {
      "get": {
        "summary": "Get user profile",
        "description": "Retrieve the profile of the currently logged in user.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "User profile retrieved successfully.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized. User not logged in."
          },
          "500": {
            "description": "Internal server error. Failed to retrieve user profile."
          }
        }
      },
      "put": {
        "summary": "Update user profile",
        "description": "Update the profile of the currently logged in user.",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUserProfile"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User profile updated successfully."
          },
          "400": {
            "description": "Bad request. Invalid user data."
          },
          "401": {
            "description": "Unauthorized. User not logged in."
          },
          "500": {
            "description": "Internal server error. Failed to update user profile."
          }
        }
      }
    }
  }
}

export default swaggerDocument;
