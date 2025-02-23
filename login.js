async function loginButton() {
    const userId = document.getElementById('inputId').value;
    const userPwd = document.getElementById('inputPwd').value;
    const wrongIdMessage = document.getElementById('wrongId');

    if (!userId || !userPwd) {
        wrongIdMessage.textContent = "아이디와 비밀번호를 입력해주세요.";
        wrongIdMessage.style.visibility = "visible";
        return;
    }

    try {
        const response = await fetch('https://sequence.agong.store/api/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON({ userId, userPwd })
        });

        let data;
        try {
            data = await response.json();  
        } catch (err) {
            throw new Error("서버 응답이 올바르지 않습니다."); 
        }

        if (response.ok) {
            window.location.href = "/index.html"; 
        } else {
            wrongIdMessage.textContent = data.message || "로그인 실패. 다시 시도해주세요.";
            wrongIdMessage.style.visibility = "visible";
        }
    } catch (error) {
        wrongIdMessage.textContent = "서버 오류가 발생했습니다.";
        wrongIdMessage.style.visibility = "visible";
        console.error("로그인 오류:", error);
    }
}

async function registerUser() {
    const userId = document.getElementById('inputId').value;  
    const userPwd = document.getElementById('inputPwd').value;  
    const wrongIdMessage = document.getElementById('wrongId'); 

    if (!userId || !userPwd) {
        wrongIdMessage.textContent = "아이디와 비밀번호를 입력해주세요.";
        wrongIdMessage.style.visibility = "visible";
        return;
    }

    try {
        const response = await fetch('https://sequence.agong.store/api/users/join', {  
            method: 'POST',  
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ userId, userPwd })
        });

        const data = await response.json(); 

        if (response.ok) {
            alert("회원가입 성공! 로그인 페이지로 이동합니다.");
            window.location.href = "/index.html"; 
        } else {
            wrongIdMessage.textContent = data.message || "회원가입 실패. 다시 시도해주세요.";
            wrongIdMessage.style.visibility = "visible";
        }
    } catch (error) {
        wrongIdMessage.textContent = "서버 오류가 발생했습니다.";
        wrongIdMessage.style.visibility = "visible";
        console.error("회원가입 오류:", error);
    }
}