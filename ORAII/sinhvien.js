let ttSinhvienBD = {
    hoVaTen: "Vũ Sĩ Tâm",
    namVaoTruong: "2021",
    bacDaoTao: "Đại học đại trà",
    chuongTrinh: "Khoa học máy tính",
    khoaQuanLi: "Trường Công nghệ thông tin và Truyền thông",
    maSv: "20215352",
    tinhTrangHocTap: "Học",
    gioiTinh: "Nam",
    lop: "Khoa học máy tính 05 Khóa 66",
    khoaHoc: "2021",
    email: "Tam.VS215475@sis.hust.edu.vn",
    srcImage : "./Contents/Images/anhDaiDien.png"
}
let ttSinhvienEdit = {
    hoVaTen: "Vũ Sĩ Tâm",
    namVaoTruong: "2021",
    bacDaoTao: "Đại học đại trà",
    chuongTrinh: "Khoa học máy tính",
    khoaQuanLi: "Trường Công nghệ thông tin và Truyền thông",
    maSv: "20215475",
    tinhTrangHocTap: "Học",
    gioiTinh: "Nam",
    lop: "Khoa học máy tính 05 Khóa 66",
    khoaHoc: "2021",
    email: "Tam.VS215475@sis.hust.edu.vn",
    srcImage : "./Contents/Images/avatar.png"
}

function createBG() {
    document.getElementById("HoTen").innerText = ttSinhvienBD.hoVaTen;
    document.getElementById("MSSV").innerText = ttSinhvienBD.maSv
    document.getElementById("NamVaoTruong").innerText = ttSinhvienBD.namVaoTruong
    document.getElementById("BacDaoTao").innerText = ttSinhvienBD.bacDaoTao
    document.getElementById("ChuongTrinh").innerText = ttSinhvienBD.chuongTrinh
    document.getElementById("Khoa").innerText = ttSinhvienBD.khoaQuanLi
    document.getElementById("TinhTrangHocTap").innerText = ttSinhvienBD.tinhTrangHocTap
    document.getElementById("GioiTinh").innerText = ttSinhvienBD.gioiTinh
    document.getElementById("KhoaHoc").innerText = ttSinhvienBD.khoaHoc
    document.getElementById("Email").innerText = ttSinhvienBD.email
    document.getElementById("Lop").innerText = ttSinhvienBD.lop
    document.getElementById("ctl00_ctl00_contentPane_MainPanel_MainContent_UserImageCPanel_imgUserImage").src = ttSinhvienBD.srcImage



}
createBG();


function edit() {

    HoTen.innerHTML = '<input type="text" id="editName" value="' + ttSinhvienEdit.hoVaTen + '">';
    NamVaoTruong.innerHTML = '<input type="text" id="editNamVaoTruong" value="' + ttSinhvienEdit.namVaoTruong + '">';
    BacDaoTao.innerHTML = `<select id="editBacDaoTao" name="editBacDaoTao" style="display: inline-block; margin-bottom: 5px; height: 20px">
    <option>Đại học đại trà</option>
    <option>Đào tạo tài năng</option>
    <option>Chương trình tiên tiến</option>
    <option>Khác</option>
  </select>`;
  document.getElementById('editBacDaoTao').value = ttSinhvienEdit.bacDaoTao;


    ChuongTrinh.innerHTML = `<select id="editChuongTrinh" name="editChuongTrinh" style="display: inline-block; margin-bottom: 5px; height: 20px">
  <option>Khoa học máy tính </option>
  <option>Kĩ thuật máy tính</option>
  <option>Việt Nhật</option>
  <option>Việt Pháp</option>
  <option>Khác</option>
</select>`;
document.getElementById('editChuongTrinh').value = ttSinhvienEdit.chuongTrinh;
    Khoa.innerHTML = ` <select 
id="editKhoa"
name="editKhoa"
style="display: inline-block; margin-bottom: 5px; height: 20px;"
>
<option>Trường Công nghệ thông tin và Truyền thông</option>
<option>Trường Cơ khí</option>
<option>Trường Điện - Điện tử</option>
<option>Trường Hoá và Khoa học sự sống</option>
<option>Trường Vật liệu</option>
<option>Khoa Toán - Tin</option>
<option>Khoa Vật lý Kỹ thuật</option>
<option>Viện Kinh tế và Quản lý</option>
<option>Khoa Ngoại ngữ</option>
<option>Khoa Khoa học và Công nghệ Giáo dục</option>
</select>`;
document.getElementById('editKhoa').value = ttSinhvienEdit.khoaQuanLi;


TinhTrangHocTap.innerHTML = `<select  id="editTinhTrangHocTap"
name="editTinhTrangHocTap"
style="display: inline-block; margin-bottom: 5px; height: 20px;">
<option>Học</option>
<option>Buộc Thôi học</option>
<option>Nghỉ học</option>
<option>Tốt nghiệp</option></select>`;
document.getElementById('editTinhTrangHocTap').value = ttSinhvienEdit.tinhTrangHocTap;




GioiTinh.innerHTML = `<div class="gender-options">
<label class="gender-label">
    <input type="radio" id="gioiTinhNam" name="gioi_tinh" value="Nam"  checked>
    <label for="gioiTinhNam">Nam</label>
</label>
<label class="gender-label">
    <input type="radio" id="gioiTinhNu" name="gioi_tinh" value="Nữ" style="margin-left: 15px;" >
    <label for="gioiTinhNu">Nữ</label>
</label>
<label class="gender-label">
    <input type="radio" id="gioiTinhKhac" name="gioi_tinh" value="Khác" style="margin-left: 15px;">
    <label for="gioiTinhKhac">Khác</label>
</label>
</div>`;
Lop.innerHTML = '<input type="text" id="editLop" style = "width : 200px" value="' + ttSinhvienEdit.lop + '">';
KhoaHoc.innerHTML = '<input type="text" id="editKhoaHoc" value="' + ttSinhvienEdit.khoaHoc + '">';
Email.innerHTML = '<input type="text" id="editEmail" style ="width : 220px" value="' + ttSinhvienEdit.email + '">';
addButton.style.display = "block";
fileInput.style.display = "block";

}

document.getElementById('fileInput').addEventListener('change', function() {
    updateImage();
});
let srcF ="./Contents/Images/anhDaiDien.png";
function updateImage() {
    let fileInput = document.getElementById('fileInput');
    let imagePreview = document.getElementById('ctl00_ctl00_contentPane_MainPanel_MainContent_UserImageCPanel_imgUserImage');

    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        srcF=e.target.result;
    };

    reader.readAsDataURL(file);
}






function myFunctionOK(){
    ttSinhvienEdit.hoVaTen =  document.getElementById('editName').value;
    ttSinhvienEdit.namVaoTruong =document.getElementById('editNamVaoTruong').value;
    ttSinhvienEdit.bacDaoTao =document.getElementById('editBacDaoTao').value;
    ttSinhvienEdit.chuongTrinh =document.getElementById('editChuongTrinh').value;
    ttSinhvienEdit.khoaQuanLi =document.getElementById('editKhoa').value;
    ttSinhvienEdit.tinhTrangHocTap =document.getElementById('editTinhTrangHocTap').value;
    ttSinhvienEdit.lop =document.getElementById('editLop').value;
    ttSinhvienEdit.khoaHoc =document.getElementById('editKhoaHoc').value;
    ttSinhvienEdit.email =document.getElementById('editEmail').value;
    ttSinhvienEdit.namVaoTruong =document.getElementById('editNamVaoTruong').value;
    ttSinhvienEdit.srcImage = srcF;

    var selectedGender = document.querySelector('input[name="gioi_tinh"]:checked').value;
    ttSinhvienEdit.gioiTinh = selectedGender;
    console.log(ttSinhvienEdit);

    document.getElementById("HoTen").innerText = ttSinhvienEdit.hoVaTen;
    document.getElementById("MSSV").innerText = ttSinhvienEdit.maSv
    document.getElementById("NamVaoTruong").innerText = ttSinhvienEdit.namVaoTruong
    document.getElementById("BacDaoTao").innerText = ttSinhvienEdit.bacDaoTao
    document.getElementById("ChuongTrinh").innerText = ttSinhvienEdit.chuongTrinh
    document.getElementById("Khoa").innerText = ttSinhvienEdit.khoaQuanLi
    document.getElementById("TinhTrangHocTap").innerText = ttSinhvienEdit.tinhTrangHocTap
    document.getElementById("GioiTinh").innerText = ttSinhvienEdit.gioiTinh
    document.getElementById("KhoaHoc").innerText = ttSinhvienEdit.khoaHoc
    document.getElementById("Email").innerText = ttSinhvienEdit.email
    document.getElementById("Lop").innerText = ttSinhvienEdit.lop
    document.getElementById("ctl00_ctl00_contentPane_MainPanel_MainContent_UserImageCPanel_imgUserImage").src  = ttSinhvienEdit.srcImage;

    addButton.style.display = "none";
    fileInput.style.display = "none";

}

document.getElementById('fileInput').addEventListener('change', function() {
    updateImage();
});

function myFunctionCancel(){
    document.getElementById("HoTen").innerText = ttSinhvienEdit.hoVaTen;
    document.getElementById("MSSV").innerText = ttSinhvienEdit.maSv
    document.getElementById("NamVaoTruong").innerText = ttSinhvienEdit.namVaoTruong
    document.getElementById("BacDaoTao").innerText = ttSinhvienEdit.bacDaoTao
    document.getElementById("ChuongTrinh").innerText = ttSinhvienEdit.chuongTrinh
    document.getElementById("Khoa").innerText = ttSinhvienEdit.khoaQuanLi
    document.getElementById("TinhTrangHocTap").innerText = ttSinhvienEdit.tinhTrangHocTap
    document.getElementById("GioiTinh").innerText = ttSinhvienEdit.gioiTinh
    document.getElementById("KhoaHoc").innerText = ttSinhvienEdit.khoaHoc
    document.getElementById("Email").innerText = ttSinhvienEdit.email
    document.getElementById("Lop").innerText = ttSinhvienEdit.lop
    document.getElementById("ctl00_ctl00_contentPane_MainPanel_MainContent_UserImageCPanel_imgUserImage").src  = ttSinhvienEdit.srcImage;
    console.log(ttSinhvienEdit);

    addButton.style.display = "none";
    fileInput.style.display = "none";

    
}
function myFunctionReset(){
    ttSinhvienEdit.hoVaTen = ttSinhvienBD.hoVaTen
    ttSinhvienEdit.namVaoTruong= ttSinhvienBD.namVaoTruong
    ttSinhvienEdit.bacDaoTao= ttSinhvienBD.bacDaoTao
    ttSinhvienEdit.chuongTrinh= ttSinhvienBD.chuongTrinh
    ttSinhvienEdit.khoaQuanLi= ttSinhvienBD.khoaQuanLi
    ttSinhvienEdit.maSv= ttSinhvienBD.maSv
    ttSinhvienEdit.tinhTrangHocTap= ttSinhvienBD.tinhTrangHocTap
    ttSinhvienEdit.gioiTinh= ttSinhvienBD.gioiTinh
    ttSinhvienEdit.lop= ttSinhvienBD.lop
    ttSinhvienEdit.khoaHoc= ttSinhvienBD.khoaHoc
    ttSinhvienEdit.email= ttSinhvienBD.email
    ttSinhvienEdit.srcImage = ttSinhvienBD.srcImage

    document.getElementById("HoTen").innerText = ttSinhvienBD.hoVaTen;
    document.getElementById("MSSV").innerText = ttSinhvienBD.maSv
    document.getElementById("NamVaoTruong").innerText = ttSinhvienBD.namVaoTruong
    document.getElementById("BacDaoTao").innerText = ttSinhvienBD.bacDaoTao
    document.getElementById("ChuongTrinh").innerText = ttSinhvienBD.chuongTrinh
    document.getElementById("Khoa").innerText = ttSinhvienBD.khoaQuanLi
    document.getElementById("TinhTrangHocTap").innerText = ttSinhvienBD.tinhTrangHocTap
    document.getElementById("GioiTinh").innerText = ttSinhvienBD.gioiTinh
    document.getElementById("KhoaHoc").innerText = ttSinhvienBD.khoaHoc
    document.getElementById("Email").innerText = ttSinhvienBD.email
    document.getElementById("Lop").innerText = ttSinhvienBD.lop
    document.getElementById("ctl00_ctl00_contentPane_MainPanel_MainContent_UserImageCPanel_imgUserImage").src  = ttSinhvienBD.srcImage;
    addButton.style.display = "none";
    fileInput.style.display = "none";
    console.log(ttSinhvienEdit);
    
}
