document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    
    // --- Mobile Sidebar Toggle ---
    const contactItems = document.querySelectorAll('.contact-item');
    const sidebar = document.getElementById('sidebar');
    const backBtn = document.getElementById('back-btn');

    // Chuyển đổi danh bạ
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            // Đổi màu active
            contactItems.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Xóa badge tin nhắn chưa đọc nếu có
            const badge = this.querySelector('.unread-badge');
            if(badge) badge.remove();
            const preview = this.querySelector('.preview-msg');
            if(preview) preview.classList.remove('unread');

            // Trên mobile: Ẩn sidebar đi để hiện khung chat
            if(window.innerWidth <= 768) {
                sidebar.classList.add('hidden');
            }
        });
    });

    // Nút quay lại (Trên Mobile)
    if(backBtn) {
        backBtn.addEventListener('click', () => {
            sidebar.classList.remove('hidden');
        });
    }

    // --- Logic Nhắn tin ---

    // Kích hoạt nút gửi khi có text
    messageInput.addEventListener('input', function() {
        if(this.value.trim().length > 0) {
            sendBtn.classList.add('active');
        } else {
            sendBtn.classList.remove('active');
        }
    });

    // Hàm lấy giờ hiện tại (Format: HH:MM)
    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }

    // Hàm tạo khối tin nhắn
    function createMessageElement(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'message-content-wrapper';

        const textDiv = document.createElement('div');
        textDiv.className = 'message-content';
        textDiv.textContent = text;

        const timeSpan = document.createElement('span');
        timeSpan.className = 'msg-time';
        timeSpan.textContent = getCurrentTime();

        contentWrapper.appendChild(textDiv);
        contentWrapper.appendChild(timeSpan);
        messageDiv.appendChild(contentWrapper);

        return messageDiv;
    }

    // Xử lý khi nhấn Gửi
    function handleSend() {
        const text = messageInput.value.trim();
        if (!text) return;

        // 1. In tin nhắn của người dùng lên màn hình
        const userMsg = createMessageElement(text, 'sent');
        chatMessages.appendChild(userMsg);
        
        // Reset input và cuộn xuống
        messageInput.value = '';
        sendBtn.classList.remove('active');
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 2. Giả lập Bot "Đang gõ..." và trả lời sau 1.5 giây
        setTimeout(() => {
            typingIndicator.style.display = 'flex';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                typingIndicator.style.display = 'none';
                
                // Bot trả lời ngẫu nhiên
                const replies = ["Tuyệt vời quá!", "Mình hiểu rồi.", "Ok bạn nhé, tiến hành luôn đi.", "Giao diện rất mượt!"];
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                
                const botMsg = createMessageElement(randomReply, 'received');
                
                // Thêm Avatar cho bot
                const avatar = document.createElement('img');
                avatar.src = "https://ui-avatars.com/api/?name=Nguyen+A&background=random";
                avatar.className = "avatar-small";
                botMsg.insertBefore(avatar, botMsg.firstChild);

                chatMessages.appendChild(botMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
            
        }, 500);
    }

    // Gán sự kiện gửi
    sendBtn.addEventListener('click', handleSend);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});