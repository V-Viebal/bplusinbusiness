# B+IN

Mở http://localhost:3021/. Chạy `npm run build && npm run preview` để xem bản local.

## Quản trị local

Mở `http://localhost:3021/#/admin`, đăng nhập bằng tài khoản được tạo trong `.local-content/first-login.txt` (tệp này chỉ nằm trên máy và không được đưa lên Git). Nút **Chỉnh sửa trang** xuất hiện khi đăng nhập: chọn chữ hoặc ảnh, sửa, rồi bấm **Lưu tất cả**. Nội dung đã lưu nằm trong `.local-content/site-content.json` và áp dụng trên bản local. Đăng xuất sẽ khóa chế độ sửa. Chỉ sử dụng trên máy riêng; để triển khai công khai cần một dịch vụ quản trị được xác thực và cơ sở dữ liệu riêng.

## Tư vấn bảng màu

Nút **Tư vấn màu sắc** cho phép nhập độ tuổi, sở thích, ánh sáng, không gian và ngũ hành tham khảo. Nếu máy chủ có `GEMINI_API_KEY`, kết quả dùng AI; nếu chưa có khóa, công cụ hiển thị gợi ý thiết kế theo quy tắc và ghi rõ nguồn. Khóa API chỉ đặt trên máy chủ, không đưa vào trình duyệt. Phong thủy là yếu tố tham khảo, không phải cam kết kết quả.
