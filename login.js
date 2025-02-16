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
        const response = await fetch('https://Sequence.com/api/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, userPwd })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = "/mainPage.html"; 
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

document.addEventListener("DOMContentLoaded", () => {
    const displayPwd = document.querySelector("#displayPwd");
    const realPwd = document.querySelector("#realPwd");
    let password = "12345";

    if (displayPwd && realPwd) {
        displayPwd.addEventListener("input", (event) => {
            const currentValue = event.target.value;

            if (currentValue.length > password.length) {
                // Add new characters to password
                password += currentValue.slice(password.length);
            } else if (currentValue.length < password.length) {
                // Remove last character from password
                password = password.slice(0, -1);
            }

            // Update hidden input value
            realPwd.value = password;

            // Replace visible input with '*'
            displayPwd.value = "*".repeat(password.length);
        });
    }
});

async function registerUser() {
    const userId = document.getElementById('inputId').value;  // 아이디 입력값 가져오기
    const userPwd = document.getElementById('inputPwd').value;  // 비밀번호 입력값 가져오기
    const wrongIdMessage = document.getElementById('wrongId');  // 오류 메시지 표시할 요소

    // 1️⃣ 입력값 검증
    if (!userId || !userPwd) {
        wrongIdMessage.textContent = "아이디와 비밀번호를 입력해주세요.";
        wrongIdMessage.style.visibility = "visible";
        return;
    }

    try {
        const response = await fetch('https://Sequence.com/api/users/join', {  
            method: 'POST',  // 회원가입은 보통 POST 방식
            headers: { "Content-Type": "application/json" },  // JSON 형식으로 보냄
            body: JSON.stringify({ userId, userPwd })  // 입력한 아이디/비밀번호를 JSON으로 변환 후 전송
        });

        const data = await response.json();  // 서버에서 받은 응답을 JSON으로 변환

        // 3️⃣ 회원가입 성공 여부 확인
        if (response.ok) {
            alert("회원가입 성공! 로그인 페이지로 이동합니다.");
            window.location.href = "/loginPage.html";  // 로그인 페이지로 이동
        } else {
            wrongIdMessage.textContent = data.message || "회원가입 실패. 다시 시도해주세요.";
            wrongIdMessage.style.visibility = "visible";
        }
    } catch (error) {
        // 4️⃣ 서버 오류 발생 시 처리
        wrongIdMessage.textContent = "서버 오류가 발생했습니다.";
        wrongIdMessage.style.visibility = "visible";
        console.error("회원가입 오류:", error);
    }
}
