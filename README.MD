### Bank Application


## การติดตั้ง Backend สร้างไฟล์ .env แล้วใส่ข้อมูลด้านล่าง เปลี่ยน username และ password ตาม mongoDB Atlas ของคุณ
```
PORT = 5000
DB_LOCAL_URI = mongodb+srv://<username>:<password>@cluster0.6f2dhjr.mongodb.net/?retryWrites=true&w=majority

JWT_SECRET = HKJW23ASMWO134OAPLC
```

# ใช้คำสั่ง npm rundev หลังจาก cd เข้าไปที่ backend
# ยิง api postman ทดสอบ