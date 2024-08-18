class Item {
    constructor(price, quality, quantity, COGS = 0) {
        this.price = price;
        this.quality = quality;
        this.quantity = quantity;
        this.COGS = COGS;
    }

    hitungTotal(bonus) {
        let total = (this.price + this.price * bonus * this.quality - this.COGS) * this.quantity;
        return Math.floor(total);
    }

    hitungPerItem(bonus) {
        let total = this.price + this.price * bonus * this.quality - this.COGS;
        return Math.floor(total);
    }

    hitungBonusPerQuality(bonus) {
        let bonusPerQuality = this.price * bonus;
        return Math.floor(bonusPerQuality);
    }
}

class Order {
    constructor(items, bonus, wages) {
        this.items = items;
        this.bonus = bonus;
        this.wages = wages;
    }

    hasil() {
        let hasilPerItem = [];
        let total = 0;

        this.items.forEach((item, idx) => {
            let hasil = item.hitungPerItem(this.bonus);
            let bonusPerQuality = item.hitungBonusPerQuality(this.bonus);
            hasilPerItem.push(`Item ${idx + 1}: ${hasil}, Bonus per Quality: ${bonusPerQuality}`);
            total += item.hitungTotal(this.bonus);
        });

        total -= this.wages; // Perbaikan: menambahkan wages dari objek Order

        let hasilStr = hasilPerItem.join("\n") + `\nTotal setelah dikurangi ${this.wages}: ${total}`;
        return hasilStr;
    }
}

// Contoh penggunaan:
let order1 = new Order([
    new Item(99792, 6, 2, 102000), 
    new Item(34895, 6, 5, 29999)
], 0.0149, 40500); // Perbaikan: menambahkan wages

console.log(order1.hasil());

let items = [];

function addItem() {
    let itemHTML = `
        <div class="item">
            Type 
            <select class="type">
                <option value="type1">Single Engine Plane</option>
                <option value="type2">Satelite</option>
                <option value="type3">Luxury Jet</option>
                <option value="type4">Sub Orbital Rocket</option>
                <option value="type5">Jumbo Jet</option>
                <option value="type6">BFR</option>
            </select> <br>
            Price <input type="number" class="price"> <br>
            Quality <input type="number" class="quality"> <br>
            Quantity <input type="number" class="quantity"> <br>
            COGS <input type="number" class="cogs"> <br>
        </div>
    `;
    document.getElementById('items').insertAdjacentHTML('beforeend', itemHTML);
}

function calculate() {
    let bonus = parseFloat(document.getElementById('bonus').value);
    let wages = parseFloat(document.getElementById('wages').value); // Mendapatkan nilai wages dari input
    let itemElements = document.getElementsByClassName('item');
    items = [];

    for (let itemElement of itemElements) {
        let type = itemElement.querySelector('.type').value;
        let price = parseFloat(itemElement.querySelector('.price').value);
        let quality = parseFloat(itemElement.querySelector('.quality').value);
        let quantity = parseFloat(itemElement.querySelector('.quantity').value);
        let COGS = parseFloat(itemElement.querySelector('.cogs').value) || 0;

        let item = new Item(price, quality, quantity, COGS);
        items.push(item);
    }

    let order = new Order(items, bonus, wages); // Menambahkan wages saat membuat objek Order
    let hasil = order.hasil();

    let hasilLines = hasil.split('\n');
    let totalLine = hasilLines.pop();

    document.getElementById('output_bonus').textContent = hasilLines.map(line => line.split(", Bonus per Quality:")[1]).join(", ");
    document.getElementById('output_price').textContent = hasilLines.map(line => line.split(": ")[1].split(", Bonus per Quality:")[0]).join(", ");
    document.getElementById('output_total').textContent = totalLine.split(": ")[1];
}
