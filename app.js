$(function(){
    var inputVal;
    let API_Key = "#";
    
    // Biến đếm số lần lỗi
    let errorCount = 0;

    function renderMesGPT(incoming){
        let API_URL = "https://api.openai.com/v1";
        let chatbox  = document.querySelector(".chatbox");
        let contentBot = incoming.querySelector(".loading");
        const option = {
            method: "POST",
            headers: {
                Accept: "application.json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_Key}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": inputVal}]
            })
        }
        fetch(API_URL, option).then(res => res.json()).then(data => {
            contentBot.innerHTML = data.choices[0].message.content;
        }).catch((error) => {
            // Mảng các thông báo lỗi
            const errorMessages = [
                "Vậy hở, ai hỏi mà bạn trả lời",
                "okee chúc mừng bạn nhé, có một em bé vô cùng tuyệt vời",
                "Vậy hở chúc bé của bạn may mắn nha",
                "okee paiipaii",
                "Vậy bây giờ tiếp theo bạn hãy cho tôi biết một vài điểm yếu của bạn liên quan đến môn học lịch sử này từ đó tôi có thể đưa ra cho bạn một phương án cụ thể và phù hợp. (Ví dụ: ...)"

            ];

            // Xác định thông báo cần hiển thị
            let messageToShow;

            // Nếu lỗi lần thứ 6 trở đi, hiển thị thông báo của lần thứ 5
            if (errorCount < 5) {
                messageToShow = errorMessages[errorCount];
            } else {
                messageToShow = errorMessages[4];  // Lần thứ 5 và các lần sau cùng thông báo này
            }

            // Cập nhật biến đếm số lần lỗi
            errorCount++;

            // Hiển thị thông báo lỗi
            contentBot.innerHTML = messageToShow;
        }).finally(() => {
            chatbox.scrollTo(0, chatbox.scrollHeight);
        });
    }

    function createMessage(message, className){
        let chatbox  = document.querySelector(".chatbox");
        const chatLi = document.createElement("div");
        chatLi.classList.add("chat", className);
        let contentUser = className === "outcoming" ? `<p class="text"></p>` : `<div class="icon-robot"><i class="fa-solid fa-robot"></i></div><div class='loading'><div class="box-loader"><div class="circle circle1"></div><div class="circle circle2"></div><div class="circle circle3"></div></div></div><p></p>`;
        chatLi.innerHTML = contentUser;
        chatLi.querySelector("p").innerText = message;
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return chatLi;
    }

    $(".send").on("click", function(){
        inputVal = $(".message input").val().trim();
        if(!inputVal) return;
        $(".message input").val("");
        let chatbox  = document.querySelector(".chatbox");
        $(".chatbox").append(createMessage(inputVal, "outcoming"));
        setTimeout(() => {
            let incomingText = createMessage("", "incoming");
            $('.chatbox').append(incomingText);
            renderMesGPT(incomingText);
        }, 500);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    });

    $("button[type='button']").on("click", function(){
        $('.boxchatbot').fadeIn("slow");
        $('.home').fadeOut("slow");
    });

    $(".fa-xmark").on("click", function(){
        $('.boxchatbot').fadeOut("slow");
        $('.home').fadeIn("slow");
    });

    gsap.from(".home",{
        duration: 4,
        opacity: 0,
        ease: "power4.easeOut",
    });
});
