
let rotation = 0;
let avatarImage = "";

// ROTATION
function rotateAvatar(amount) {
  rotation += amount;
  document.getElementById("avatar-img").style.transform = `rotate(${rotation}deg)`;
}

// UPLOAD IMAGE
document.getElementById("upload").addEventListener("change", function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    avatarImage = event.target.result;
    document.getElementById("avatar-img").src = avatarImage;
  };

  reader.readAsDataURL(file);
});

// SHOP BUY
function buyItem(itemName, cost) {
  let coins = Number(localStorage.getItem("coins") || 0);

  if (coins < cost) {
    alert("Not enough coins!");
    return;
  }

  coins -= cost;
  localStorage.setItem("coins", coins);

  let inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
  inventory.push(itemName);
  localStorage.setItem("inventory", JSON.stringify(inventory));

  loadInventory();
  alert("Purchased!");
}

// INVENTORY DISPLAY
function loadInventory() {
  let inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
  document.getElementById("inventory-box").innerHTML =
    inventory.length === 0
      ? "No items yet"
      : inventory.join(", ");
}

// SAVE AVATAR
function saveAvatar() {
  const avatar = {
    img: avatarImage,
    rotation: rotation
  };

  localStorage.setItem("avatar", JSON.stringify(avatar));
  alert("Character saved!");
}

// LOAD EXISTING AVATAR
function loadAvatar() {
  const saved = JSON.parse(localStorage.getItem("avatar"));
  if (!saved) return;

  avatarImage = saved.img;
  rotation = saved.rotation;

  document.getElementById("avatar-img").src = avatarImage;
  document.getElementById("avatar-img").style.transform = `rotate(${rotation}deg)`;
}

loadAvatar();
loadInventory();
