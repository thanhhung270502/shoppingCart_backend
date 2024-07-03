const pool = require('../src/config/db');

const createTableCategory1 = async () => {
    try {
        await pool.query('drop table if exists category_1 cascade');

        const query = `
        CREATE TABLE category_1 (
            id      TEXT PRIMARY KEY,
            "name"  TEXT
        );`;

        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableCategory2 = async () => {
    try {
        await pool.query('drop table if exists category_2 cascade');

        const query = `
        CREATE TABLE category_2 (
            id              TEXT PRIMARY KEY,
            "name"          TEXT,
            category_1_id   TEXT,
            FOREIGN KEY (category_1_id) REFERENCES category_1(id)
        );`;

        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableCategory3 = async () => {
    try {
        await pool.query('drop table if exists category_3 cascade');

        const query = `
        CREATE TABLE category_3 (
            id              TEXT PRIMARY KEY,
            "name"          TEXT,
            category_2_id   TEXT,
            FOREIGN KEY (category_2_id) REFERENCES category_2(id)
        );`;

        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableCategory4 = async () => {
    try {
        await pool.query('drop table if exists category_4 cascade');

        const query = `
        CREATE TABLE category_4 (
            id              TEXT PRIMARY KEY,
            "name"          TEXT,
            category_3_id   TEXT,
            FOREIGN KEY (category_3_id) REFERENCES category_3(id)
        );`;

        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableCategory5 = async () => {
    try {
        await pool.query('drop table if exists category_5 cascade');

        const query = `
        CREATE TABLE category_5 (
            id              TEXT PRIMARY KEY,
            "name"          TEXT,
            category_4_id   TEXT,
            FOREIGN KEY (category_4_id) REFERENCES category_4(id)
        );`;

        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const insertDataCategory1 = async () => {
    try {
        const query = `
INSERT INTO category_1 (id, "name") 
VALUES ('8322', 'Nhà Sách');
        `;

        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const insertDataCategory2 = async () => {
    try {
        const query = `
INSERT INTO category_2 (id, "name", category_1_id) VALUES 
('316', 'Sách tiếng Việt', '8322'),
('18328', 'Quà lưu niệm', '8322'),
('7741', 'Văn phòng phẩm', '8322'),
('320', 'English Books', '8322');
        `;

        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const insertDataCategory3 = async () => {
    try {
        const query = `
INSERT INTO category_3 (id, "name", category_2_id) VALUES 
('846', 'Sách kinh tế', '316'),
('873', 'Sách Kiến Thức Tổng Hợp', '316'),
('839', 'Sách văn học', '316'),
('870', 'Sách kỹ năng sống', '316'),
('6225', 'Bookmark', '18328'),
('393', 'Sách thiếu nhi ', '316'),
('887', 'Sách Học Ngoại Ngữ', '316'),
('881', 'Điện Ảnh - Nhạc - Họa', '316'),
('1084', 'Truyện Tranh, Manga, Comic', '316'),
('861', 'Sách Tôn Giáo - Tâm Linh', '316'),
('1910', 'Flashcards', '7741'),
('2452', 'Máy Tính Điện Tử', '7741'),
('2320', 'Sách Tham Khảo', '316'),
('885', 'Sách Y Học', '316'),
('2527', 'Nuôi dạy con', '316'),
('868', 'Sách Tâm lý - Giới tính', '316'),
('862', 'Sách Thường Thức - Gia Đình', '316'),
('880', 'Sách Lịch sử', '316'),
('5308', 'Education - Teaching', '320'),
('8265', 'Móc Khóa', '18328'),
('2321', 'Sách Giáo Khoa - Giáo Trình', '316'),
('2368', 'Sản phẩm về giấy', '7741'),
('1858', 'Bút - Viết các loại', '7741'),
('614', 'How-to - Self Help', '320'),
('282', 'Dictionary', '320'),
('2538', 'Bút Chì Màu - Bút Lông Màu - Sáp Màu', '7741'),
('2365', 'Dụng Cụ Học Sinh', '7741'),
('18342', 'Phụ kiện - Vật liệu trang trí', '18328'),
('876', 'Sách Công Nghệ Thông Tin', '316'),
('1899', 'Sổ Tay Các Loại', '7741'),
('27', 'Biographies & Memoirs', '320'),
('857', 'Sách Văn Hóa - Địa Lý - Du Lịch', '316'),
('897', 'Từ Điển', '316'),
('1862', 'Dụng Cụ Văn Phòng', '7741'),
('875', 'Sách Chính Trị - Pháp Lý', '316'),
('18378', 'Phấn - Bảng viết - Lau bảng', '7741'),
('6905', 'Thể Dục - Thể Thao', '316'),
('4624', 'Thú Nhồi Bông', '18328'),
('18344', 'Quà tặng trang trí khác', '18328'),
('68202', 'Khung hình', '18328'),
('68205', 'Thiệp', '18328'),
('6541', 'Bưu ảnh - Postcard', '18328'),
('1907', 'Tập vở các loại ', '7741'),
('879', 'Sách Khoa Học - Kỹ Thuật', '316');
        `;

        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const insertDataCategory4 = async () => {
    try {
        const query = `
INSERT INTO category_4 (id, "name", category_3_id) VALUES 
('67904', 'Sách tài chính', '846'),
('849', 'Sách quản trị, lãnh đạo', '846'),
('886', 'Lĩnh vực khác', '873'),
('844', 'Tiểu Thuyết', '839'),
('7671', 'Sách Chiêm Tinh - Horoscope', '873'),
('871', 'Sách tư duy - Kỹ năng sống', '870'),
('845', 'Truyện ngắn - Tản văn - Tạp Văn', '839'),
('665', 'Truyện kinh dị', '839'),
('67407', 'Bookmark giấy', '6225'),
('842', 'Tác phẩm kinh điển', '839'),
('1753', 'Truyện cổ tích', '393'),
('840', 'Truyện Giả tưởng - Huyền Bí - Phiêu Lưu', '839'),
('1856', 'Sách Học Tiếng Anh', '887'),
('4142', 'Sách Tô Màu Dành Cho Người Lớn', '881'),
('1367', 'Truyện đam mỹ', '839'),
('67929', 'Sách kỹ năng mềm', '870'),
('9733', 'Kiến Thức Bách Khoa', '873'),
('664', 'Truyện trinh thám', '839'),
('6750', 'Truyện dài', '839'),
('67979', 'Phật giáo', '861'),
('854', 'Truyện kể cho bé', '393'),
('67389', 'Flashcard trắng trơn', '1910'),
('847', 'Bài học kinh doanh', '846'),
('67945', 'Sách tâm lý học', '870'),
('1922', 'Máy Tính Khoa Học', '2452'),
('1754', 'Văn học thiếu nhi', '393'),
('7971', 'Sách Luyện Thi Đại Học - Cao Đẳng', '2320'),
('385', 'Sách kỹ năng làm việc', '846'),
('7358', 'Light novel', '839'),
('68003', 'Sách Y Học Khác', '885'),
('848', 'Sách Marketing - Bán hàng ', '846'),
('877', 'Sách giáo dục', '873'),
('843', 'Tiểu sử - Hồi ký', '839'),
('446', 'Thơ', '839'),
('3320', 'Cẩm nang làm cha mẹ', '2527'),
('444', 'Truyện cười', '839'),
('1881', 'Sách Học Tiếng Hoa', '887'),
('850', 'Sách Tâm Lý Tuổi Teen', '868'),
('863', 'Chăm sóc sức khỏe', '862'),
('865', 'Sách Nấu ăn', '862'),
('5245', 'Phóng sự - Ký sự - Bút ký', '839'),
('9725', 'Lịch Sử Thế Giới', '880'),
('855', 'Truyện tranh thiếu nhi', '393'),
('67980', 'Tôn Giáo - Tâm Linh Khác', '861'),
('68002', 'Sách Y Học Hiện Đại', '885'),
('14896', 'Grammar, vocabulary & skills', '5308'),
('1925', 'Máy tính bỏ túi', '2452'),
('6138', 'Sách Thai Giáo', '2527'),
('372', 'Sách khởi nghiệp', '846'),
('9120', 'Triết Học', '873'),
('3271', 'Sách Kiến Thức - Kỹ Năng Cho Trẻ', '2527'),
('9724', 'Lịch Sử Việt Nam', '880'),
('6040', 'Truyện tranh Ehon', '393'),
('6991', 'Giáo Trình Đại Học - Cao Đẳng', '2321'),
('67405', 'Giấy in', '2368'),
('6994', 'Sách Hôn Nhân - Giới Tính', '868'),
('1521', 'Truyện ngôn tình', '839'),
('9727', 'Âm Nhạc - Điện Ảnh', '881'),
('852', 'Đạo đức - Kỹ năng sống', '393'),
('1527', 'Ngoại Ngữ Khác', '887'),
('483', 'Sách doanh nhân', '846'),
('67978', 'Công Giáo', '861'),
('856', 'Tô màu - Luyện chữ  ', '393'),
('1870', 'Bút chì - Ruột bút chì', '1858'),
('9216', 'Bút gel - Bút nước', '1858'),
('9902', 'Motivational', '614'),
('853', 'Kiến thức - Bách khoa', '393'),
('14864', 'English Language Dictionary', '282'),
('1875', 'Bút lông - Ruột bút lông bảng', '1858'),
('9176', 'Flashcards Cho Bé', '1910'),
('1923', 'Máy tính điện tử để bàn', '2452'),
('1526', 'Sách Học Tiếng Hàn', '887'),
('1874', 'Bút dạ quang', '1858'),
('8934', 'Bút Lông Màu', '2538'),
('68227', 'Gôm tẩy', '2365'),
('1524', 'Sách Học Tiếng Nhật', '887'),
('4144', 'Sách quản trị nhân lực', '846'),
('67422', 'Trang trí sinh nhật', '18342'),
('9723', 'Lập Trình', '876'),
('1869', 'Bút bi - Ruột bút bi', '1858'),
('68216', 'Sáp màu', '2538'),
('9728', 'Mỹ Thuật - Kiến Trúc', '881'),
('8973', 'Tranh Truyện', '839'),
('2539', 'Cọ Vẽ', '2538'),
('67403', 'Sổ tay dán gáy', '1899'),
('4902', 'Sách Làm Đẹp', '862'),
('203', 'Celebrities & Famous People', '27'),
('4261', 'Bút chì màu', '2538'),
('716', 'Sách hướng nghiệp', '870'),
('14872', 'ELTs', '5308'),
('67404', 'Sổ tay gáy lò xo', '1899'),
('858', 'Sách Danh Nhân', '857'),
('3272', 'Sách Dinh Dưỡng - Sức Khỏe Cho Bé', '2527'),
('898', 'Từ Điển Tiếng Anh', '897'),
('68021', 'Phương pháp giáo dục trẻ', '2527'),
('6992', 'Sách Phong Tục - Tập Quán', '857'),
('3986', 'Bao Tập - Bao Sách', '2365'),
('18390', 'Giấy các loại', '2368'),
('3898', 'Băng keo', '1862'),
('68263', 'Keo Hồ', '1862'),
('883', 'Luật - Văn Bản Luật', '875'),
('903', 'Từ Điển Tiếng Việt', '897'),
('2250', 'Sách tham khảo cấp III', '2320'),
('67396', 'Bảng từ trắng viết bút lông', '18378'),
('2249', 'Sách tham khảo cấp II', '2320'),
('859', 'Sách Địa Danh - Du Lịch', '857'),
('867', 'Sách Phong Thủy - Kinh Dịch', '873'),
('68221', 'Màu nước', '2538'),
('68009', 'Yoga', '6905'),
('639', 'Truyện kiếm hiệp', '839'),
('593', 'Sách kinh tế học', '846'),
('1868', 'Bút mực - Bút máy', '1858'),
('68001', 'Sách Y Học Cổ Truyền', '885'),
('14900', 'Test Preparation', '5308'),
('14870', 'Teaching - Learning', '5308'),
('10079', 'Truyện cổ tích - Ngụ ngôn', '839'),
('14866', 'Bilingual Dictionary', '282'),
('6993', 'Lý Luận Chính Trị', '875'),
('67402', 'Sổ tay bìa da', '1899'),
('24868', 'Dụng cụ học sinh khác', '2365'),
('68203', 'Khung để bàn', '68202'),
('16662', 'Sách Giáo Khoa Cấp 2', '2321'),
('2248', 'Sách tham khảo cấp I', '2320'),
('68206', 'Thiệp chúc mừng', '68205'),
('1880', 'Bóp Viết - Hộp Bút', '2365'),
('16660', 'Sách Giáo Khoa Cấp 1', '2321'),
('9601', 'Kéo', '1862'),
('1860', 'File Hồ Sơ - Bìa Hồ Sơ', '1862'),
('5244', 'Phê Bình - Lý Luận Văn Học', '839'),
('24872', 'Tập 4 ô ly', '1907'),
('1861', 'Đồ Bấm - Kim Kẹp', '1862'),
('11118', 'Bút vẽ kỹ thuật', '1858'),
('67882', 'Sách khoa học', '879'),
('24876', 'Tập kẻ ngang', '1907'),
('67883', 'Sách kỹ thuật', '879'),
('9721', 'Tin Học Văn Phòng', '876'),
('68256', 'Dao rọc giấy', '1862'),
('11120', 'Bút viết thư pháp', '1858'),
('16664', 'Sách Giáo Khoa Cấp 3', '2321');
        `;

        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const insertDataCategory5 = async () => {
    try {
        const query = `
INSERT INTO category_5 (id, "name", category_4_id) VALUES 
('5246', 'Sách tài chính - khác', '67904'),
('67997', 'Tiểu Thuyết Phương Tây', '844'),
('67888', 'Sách chiêm tinh - horoscope - khác', '7671'),
('67999', 'Truyện ngắn - Tản văn - Tạp Văn Nước Ngoài', '845'),
('67994', 'Tác Phẩm Kinh Điển Nước Ngoài', '842'),
('68000', 'Truyện ngắn - Tản văn - Tạp Văn Việt Nam', '845'),
('67996', 'Tiểu Thuyết Phương Đông', '844'),
('67856', 'Ngữ pháp Tiếng Anh', '1856'),
('67998', 'Truyện Chữ Đam Mỹ', '1367'),
('67936', 'Kỹ Năng Giao Tiếp', '67929'),
('67853', 'Luyện thi IELTS', '1856'),
('872', 'Nghệ thuật sống', '67929'),
('67946', 'Sách tâm lý học - khác', '67945'),
('67857', 'Sách học tiếng anh - khác', '1856'),
('67859', 'Từ Vựng Tiếng Anh', '1856'),
('67867', 'Luyện thi Tiếng Hoa HSK', '1881'),
('67910', 'Đầu tư', '67904'),
('67966', 'An toàn & Sơ cứu', '863'),
('67915', 'Tài chính cá nhân', '67904'),
('67993', 'Phóng Sự - Ký Sự', '5245'),
('67866', 'Giáo trình Hán ngữ', '1881'),
('68030', 'Thai giáo', '6138'),
('67895', 'Triết Học phương Đông', '9120'),
('67887', 'Chiêm Tinh Học', '7671'),
('67889', 'Tarot', '7671'),
('67890', 'Thần Số Học - Nhân Số Học', '7671'),
('67894', 'Triết học khác', '9120'),
('67918', 'Tài chính doanh nghiệp', '67904'),
('67944', 'Sách Chữa Lành', '67929'),
('67845', 'Giáo trình đại học - cao đẳng - khác', '6991'),
('1908', 'Giấy in - Fax - Photo', '67405'),
('67807', 'Sách học Đàn Piano', '9727'),
('67860', 'Tiếng Anh Thiếu Nhi', '1856'),
('67975', 'Sức khỏe tinh thần', '863'),
('67342', 'Bút chì gỗ', '1870'),
('67345', 'Bút gel', '9216'),
('68209', 'Bút lông bảng', '1875'),
('67863', 'Ngữ pháp Tiếng Hàn', '1526'),
('67353', 'Bút lông cứng', '8934'),
('67937', 'Kỹ Năng Khác', '67929'),
('68228', 'Gôm tẩy chì', '68227'),
('67855', 'Luyện thi TOEIC', '1856'),
('67873', 'Ngữ pháp Tiếp Nhật', '1524'),
('67912', 'Kỹ thuật tài chính', '67904'),
('67337', 'Bút bi nước', '1869'),
('68212', 'Sáp dầu', '68216'),
('67810', 'Họa sĩ nổi tiếng', '9728'),
('68219', 'Cọ vẽ chuyên nghiệp', '2539'),
('67844', 'Giáo trình đại cương', '6991'),
('67965', 'Ăn kiêng - Giảm cân', '863'),
('67981', 'Danh nhân Nước Ngoài', '858'),
('68027', 'Sách ăn dặm cho bé', '3272'),
('68015', 'Từ Điển Anh - Anh', '898'),
('68025', 'Phương pháp giáo dục Montessori', '68021'),
('67988', 'Sách Phong Tục - Tập Quán Việt Nam', '6992'),
('67356', 'Bao giấy', '3986'),
('5029', 'Các loại giấy khác', '18390'),
('68247', 'Băng keo hai mặt', '3898'),
('67982', 'Danh nhân Việt Nam', '858'),
('68265', 'Keo hồ dán đa năng', '68263'),
('67828', 'Luật Nhà nước', '883'),
('67983', 'Châu Á', '859'),
('67891', 'Kinh Dịch Học', '867'),
('67941', 'Kỹ năng Quản lý cảm xúc', '67929'),
('68023', 'Phương pháp giáo dục con của người Nhật', '68021'),
('68224', 'Màu nước dạng tuýp', '68221'),
('67901', 'Sách kinh tế học - khác', '593'),
('67335', 'Bút bi bấm', '1869'),
('67350', 'Bút máy thay ruột', '1868'),
('67811', 'Mỹ thuật - Kiến trúc Thế giới', '9728'),
('67827', 'Luật Lao động', '883'),
('68022', 'Phương pháp giáo dục con của người Do Thái', '68021'),
('68028', 'Dinh dưỡng thai kỳ', '6138'),
('369', 'Kế toán', '67904'),
('8780', 'IELTS Books', '14900'),
('67846', 'Kinh tế - Tài chính - Quản trị', '6991'),
('67336', 'Bút bi dầu', '1869'),
('8777', 'High School: Grades 10 - 12', '14870'),
('68018', 'Truyện Chữ cổ tích - Ngụ ngôn', '10079'),
('67872', 'Luyện thi Tiếng Nhật', '1524'),
('68250', 'Băng keo trong suốt', '3898'),
('67995', 'Tác Phẩm Kinh Điển Việt Nam', '842'),
('67836', 'Kinh tế chính trị', '6993'),
('67793', 'Âm nhạc - điện ảnh - khác', '9727'),
('67357', 'Bao nylon', '3986'),
('67824', 'Luật Hình sự', '883'),
('68016', 'Từ Điển Anh - Việt', '898'),
('67858', 'Tiếng Anh giao tiếp', '1856'),
('18386', 'Giấy bìa - Decal', '18390'),
('67869', 'Sách học tiếng hoa - khác', '1881'),
('67903', 'Tiền kỹ thuật số', '593'),
('8782', 'Foreign Language Study & Reference', '14870'),
('67947', 'Tâm lý học hành vi', '67945'),
('67359', 'Nhựa, nhôm', '1880'),
('67893', 'Phong Thủy', '867'),
('67377', 'File hồ sơ - bìa hồ sơ - khác', '1860'),
('8775', 'Elementary School: Grades 1 - 5', '14870'),
('67374', 'Bìa lá', '1860'),
('67360', 'Vải', '1880'),
('1917', 'Bấm Lỗ', '1861'),
('67341', 'Bút chì bấm', '1870'),
('67338', 'Ruột bút bi', '1869'),
('67884', 'Kỹ Thuật Điện', '67883'),
('68230', 'Gôm tẩy mực', '68227'),
('67871', 'Tiếng Hoa Giao Tiếp', '1881'),
('67885', 'Kỹ Thuật khác', '67883');
`;

        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

(async () => {
    try {
        // await createTableCategory1();
        // await createTableCategory2();
        // await createTableCategory3();
        // await createTableCategory4();
        // await createTableCategory5();

        await insertDataCategory1();
        await insertDataCategory2();
        await insertDataCategory3();
        await insertDataCategory4();
        await insertDataCategory5();

        console.log('Waiting...');
        console.log('If program does not show anything, program run sucessfully');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
