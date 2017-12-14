# To-Do-List-2000

  [To-do-List-2000](https://to-do-list-2000.herokuapp.com).
  
  To-do-list-2000 is full-stack application to record down your notes and the things you need to do. It uses Ruby on Rails to to manage back-end(postgreSQL). Frontend handled by React.js which uses the Redux architectural framework.

## Features

### User
  User able to add new tasks in which, in turn, can create lists with notes(Body, time). Also User can add hashtags to store lists either in the form of a task or a tag.
 
### DataBase
  ### User (using Devise gem)
  ```
    create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end
  ```
  #### List
  ```
  create_table "lists", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.string "qty"
    t.integer "qty_done"
    t.integer "qty_not_done"
    t.index ["qty"], name: "index_lists_on_qty"
    t.index ["qty_done"], name: "index_lists_on_qty_done"
    t.index ["qty_not_done"], name: "index_lists_on_qty_not_done"
  end
  ```
  #### Tag
  ```
    create_table "tags", force: :cascade do |t|
    t.string "name"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "tasks_id", array: true
  end
  ```
  #### Task
  ```
  create_table "tasks", force: :cascade do |t|
    t.string "title"
    t.boolean "done"
    t.integer "list_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "time"
    t.index ["time"], name: "index_tasks_on_time"
  end
  ```
