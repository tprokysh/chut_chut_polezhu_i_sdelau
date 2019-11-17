# chut_chut_polezhu_i_sdelau

nu, poehali
# architecture
<pre>
backend/
  models/ - all database logic
  public/ - static folder for loaded file
  routes/ - api
  tests/ - tests, obviously
  utils/ - other cool functions, such as txt parser or setup multer
  createDB.sql - sql-language command for create database
  db.js - config and setup database
  index.js - app entry point
frontend/
  public/ - static for client
  src/ - source folder
    components/ - all components
      AddForm.js - component with form
      App.js - main component
      FileUpload.js - compopent with input[type="file"] for upload file
      Films.js - component with all films-items
      Filter.js - component for sort by alphabet
      SearchActors.js - component for search input for search among actors
      SearchTitle.js - component for search input for search among actors
</pre>
# git clone
<pre>
1. git clone https://github.com/tprokysh/chut_chut_polezhu_i_sdelau.git && cd chut_chut_polezhu_i_sdelau && cd backend
</pre>
# create database
1.1. Exec commands from createDB.sql <br />
1.2. Config db.js file with your settings.
# start server
<pre>
2. npm i && node index.js
</pre>
# run client
3. go to new terminal
<pre>
3.1. cd chut_chut_polezhu_i_sdelau && cd frontend && npm i && npm start
</pre>
3.3. go to localhost:3000 and touch it <br />
# run test
<pre>
4. cd chut_chut_polezhu_i_sdelau && cd frontend && npm run test
</pre>
5. thank you <3 <br />
