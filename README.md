# nodejs-express-ejs

Selasa, 17 Sept 2019, UPDATE EJS


1. di User.ejs bikin tombol EDIT untuk render halaman EditUserForm.ejs (bikin dulu file-nya dalam folder view)

2. di controller bikin sebuah fungsi exports.userEditForm, isinya res.render('EditUserForm')
3. di routes bikin url nya, app.get('/edit-form/user/:id', user.userEditForm )
4. untuk oper data dari user.userEditForm ke EditUserForm.ejs, manipulate array users.find()
5. masukan array.users.find() ke sebuah var, var findUser = array users.find(user=>user.id===req.params.id)
6. oper findUser dengan nama user ke render, res.render('EditUserForm',{user:findUser})
7. edit EditUserForm.ejs copas dari AddUserForm.ejs, tambah value ke setiap input dgn isi user.propsmasing2
8. action dalam form tambahin ?_method=PUT, methodnya POST
9. sebelumnya install method-override, require dan app.use() dalam server.js
10. di controller, exports.userUpdate, ganti res.json jadi res.redirect('/user/'+req.params.id+'/success-update')
11. buat Success.ejs dengan button link ke user/id, buat url dan logic untuk me render Success.ejs
	--> app.get('/user/:id/success-update', user.userSuccessUpdate) di routes
	--> exports.userSuccessUpdate(req,res)=>{res.render('Success', {id:req.params.id})}
12. di Success.ejs buat link-nya <a href="/user/<%=id%>"></a>
13. jangan lupa tambahkan multer middleware di app.put('/user/:id, upload.single('profile-picture), user.userUpdate)
