import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';


const Footer = () => {
  return (
    <>
        <div className='flex flex-col bg-yellow-300 text-black text-center py-7 mt-40 '>
            <h1  className='text-4xl font-bold' >TRỞ THÀNH HỘI VIÊN HƯỞNG ƯU ĐÃI 20 % </h1>
            <span>        
            <button className='bg-black text-white text-3xl p-3 mt-3 hover:text-gray-600 transition' >ĐĂNG KÝ NGAY</button>
            </span>
        </div>
        <div className='grid grid-cols-6 px-40  space-x-5 mt-10' >
            <div className='space-y-2'>
                <h1 className='text-2xl font-bold '> SẢN PHẨM </h1>
                <div> <a>Giày</a> </div>
                <div> <a>Quần áo</a> </div>
                <div> <a>Phụ kiện </a> </div>
                <div> <a>Hàng mới vể</a> </div>

            </div>
            <div className='space-y-2'>
                <h1 className='text-2xl font-bold'> THỂ THAO </h1>
                <div> <a>Chạy</a> </div>
                <div> <a>Đánh gôn</a> </div>
                <div> <a>Gym & Training </a> </div>
                <div> <a>Bóng đá</a> </div>
                <div> <a>Bóng rổ</a> </div>
                <div> <a>Quần vợt </a> </div>
                <div> <a>Ngoài trời</a> </div>
            </div>
            <div className='space-y-2' >
                <h1 className='text-2xl font-bold'> BỘ SƯU TẬP </h1>
                <div> <a>Pharrell William</a> </div>
                <div> <a>Ultraboost</a> </div>
                <div> <a>Adizero SL </a> </div>
                <div> <a>Pureboost</a> </div>
                <div> <a>Stan Smith</a> </div>
                <div> <a>NMD </a> </div>
            </div>
            <div className='space-y-2' >
                <h1 className='text-2xl font-bold'> THÔNG TIN VỀ CÔNG TY </h1>
                <div> <a>Giới thiệu về chúng tôi</a> </div>
                <div> <a>Cơ hội nghể nghiệp</a> </div>
                <div> <a>Tin tức </a> </div>
                <div> <a>Out stories</a> </div>                
            </div>
            <div  className='space-y-2'>
                <h1 className='text-2xl font-bold'> HỖ TRỢ </h1>
                <div> <a>Trợ giúp</a> </div>
                <div> <a>Tìm kiếm cửa hàng</a> </div>
                <div> <a>Kích thước </a> </div>
                <div> <a>Thanh toán</a> </div>
                <div> <a>Giao hàng</a> </div>
                <div> <a>Trả hàng & hoàn tiền </a> </div>
                <div> <a>Khuyến mãi</a> </div>
                <div> <a>Sơ đồ trang web </a> </div>
                <div> <a>Trợ giúp dịch vụ khách hàng</a> </div>

            </div>
            <div className='space-y-2' >
                <h1 className='text-2xl font-bold'> THEO DÕI CHÚNG TÔI </h1>
                <div> <a>  <FacebookIcon/> </a> </div>
                <div> <a>   <GoogleIcon/>  </a> </div>
                <div> <a>   <TwitterIcon/> </a> </div>
                <div> <a>   <PinterestIcon/> </a> </div>
                <div> <a>   <YouTubeIcon/> </a> </div>
                <div> <a>   <InstagramIcon/> </a> </div>

            </div>
        </div>
        <div className='bg-gray-700 text-white py-4 grid grid-cols-5 text-center px-32 mt-4 ' >
            
            <div>Cài đặt Cookie</div>
            
            <div>Chính sách bảo mật</div>
            
            <div>Điều khoản và dịch vụ</div>
            
            <div>Xuất bản bởi</div>
                
            <div> © 2025 Công Ty TNHH ShoeShop</div>

        </div>
    </>
  )
}

export default Footer