const user_moves = document.querySelectorAll('.user_moves');
const player_pick = document.getElementsByClassName("player_pick");

const marquee = document.getElementsByTagName('marquee');

let count_val = document.getElementById("count_val");
let count_val_content = count_val.textContent;

let scores = document.querySelectorAll('.score');
let user_score = scores[0];
let computer_score = scores[1];

const modal = document.getElementById("game_modal");
const overlay = document.getElementById("overlay");
const modal_message = document.getElementById("modal_message");
const final_score = document.getElementById("final_score");
const reset_btn = document.getElementById("reset_btn");



let user_score_value = 0;
let computer_score_value = 0;

const computer_generate = () => {
    const moves = ['bato', 'gunting', 'papel'];
    const randomIndex = Math.floor(Math.random() * 3);
    return moves[randomIndex];
};

function compare_picks(user_value){
    Array.from(marquee).forEach(x => x.style.display = 'none');

    if (Number(count_val.textContent) <= 0) return;

    count_val_content = Number(count_val.innerHTML) - 1;
    count_val.textContent = count_val_content;

    let user_pick = user_value;
    let computer_pick = computer_generate();

    player_pick[0].innerHTML = `<img src="images/${user_pick}.jpg" class="pick_image" alt="${user_value.toUpperCase()}">`;
    player_pick[1].innerHTML = `<img src="images/${computer_pick}.jpg" class="pick_image" alt="${computer_pick.toUpperCase()}">`;

    console.log(`User: ${user_pick}`);
    console.log(`Computer: ${computer_pick}`);

    if (user_pick == 'bato' && computer_pick == 'gunting'){
        user_score_value += 1;
        computer_score_value = computer_score_value;
        user_score.textContent = `Score: ${user_score_value}`
        eventUI(true);
    } else if (user_pick == 'gunting' && computer_pick == 'papel'){
        user_score_value += 1;
        computer_score_value = computer_score_value;
        user_score.textContent = `Score: ${user_score_value}`
        eventUI(true);
    } else if (user_pick == 'papel' && computer_pick == 'bato'){
        user_score_value += 1;
        computer_score_value = computer_score_value;
        user_score.textContent = `Score: ${user_score_value}`
        eventUI(true);
    } else if (user_pick == computer_pick){
        user_score_value = user_score_value
        computer_score_value = computer_score_value
    } else {
        computer_score_value += 1;
        user_score_value = user_score_value;
        computer_score.textContent = `Score: ${computer_score_value}`
        eventUI(false);
    }

    if (count_val_content == 0){

    let winner = "";

        if (user_score_value > computer_score_value) winner = "user"
        else if (user_score_value < computer_score_value) winner = "computer"
        else winner = null
        
        setTimeout(() => showGameOver(winner), 500);
    }   
}

function eventUI(isUser){
    if (isUser == true){
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.background = 'rgba(0, 0, 0, 0.8)';
            overlay.style.boxShadow = 'inset 0 0 250px rgb(157, 0, 255, 0.7)';
        }, 500);
        overlay.style.display = 'block';
        overlay.style.background = 'transparent';
        overlay.style.boxShadow = 'inset 0 0 200px rgb(255, 255, 0, 0.7)';
    }
    else if (isUser == false) {
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.background = 'rgba(0, 0, 0, 0.8)';
            overlay.style.boxShadow = 'inset 0 0 250px rgb(157, 0, 255, 0.7)';
        }, 500);
        overlay.style.display = 'block';
        overlay.style.background = 'transparent';
        overlay.style.boxShadow = 'inset 0 0 250px rgb(255, 0, 0, 0.7)';
    }
}

user_moves.forEach(button => {
    button.addEventListener("click", () => {
        compare_picks(button.value);
    });
});

// Replace your alert() logic with this function
function showGameOver(winner) {
    modal.style.display = "block";
    overlay.style.display = "block";
    overlay.style.background = 'rgba(0, 0, 0, 0.8)';
    overlay.style.boxShadow = 'inset 0 0 250px rgba(157, 0, 255, 0.7)';
    
    if (winner === 'user') modal_message.textContent = "Congrats! 🎉";
    else if (winner === 'computer') modal_message.textContent = "Talo ka! 💀";
    else modal_message.textContent = "It's a Tie! 🤝";

    final_score.textContent = `Final Score:
    You: ${user_score_value} | Computer: ${computer_score_value}
    `;
    
}

// Reset Logic
reset_btn.addEventListener("click", () => {
    Array.from(marquee).forEach(x => x.style.display = 'block');
    // Reset values
    user_score_value = 0;
    computer_score_value = 0;
    count_val.textContent = "10"; // Or your original starting number
    
    // Reset UI
    user_score.textContent = "Score: 0";
    computer_score.textContent = "Score: 0";
    player_pick[0].innerHTML = ""; // Clear images
    player_pick[1].innerHTML = "";
    
    // Hide modal
    modal.style.display = "none";
    overlay.style.display = "none";
});