import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-gs',
  standalone: true,
  imports: [],
  templateUrl: './gs.component.html',
  styleUrls: ['./gs.component.css'],
})
export class GsComponent implements AfterViewInit {
  title = 'pgs';
  inventory: item[] = [];
  equipment: equipment = {
    helm: null,
    amulet: null,
    cape: null,
    body: null,
    legs: null,
    weapon: null,
    shield: null,
    ammo: null,
    gloves: null,
    boots: null,
    ring: null,
    none: null,
  };

  @ViewChild('inventoryCanvas')
  inventoryCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('equipmentCanvas')
  equipmentCanvasRef!: ElementRef<HTMLCanvasElement>;

  // Track dragging state
  draggingItem: item | null = null;
  draggingIndex: number | null = null;
  draggingPosition: { x: number; y: number } | null = null;

  ngAfterViewInit() {
    this.BuildInventory();
    this.drawEquipment(); // Ensure this is called explicitly on component load

    // Ensure inventory click handler
    this.inventoryCanvasRef.nativeElement.addEventListener('click', (event) => {
      this.handleInventoryClick(event);
    });

    // Add drag event listeners
    const canvas = this.inventoryCanvasRef.nativeElement;
    canvas.addEventListener('mousedown', (event) => this.onMouseDown(event));
    canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
    canvas.addEventListener('mouseup', (event) => this.onMouseUp(event));
    canvas.addEventListener('mouseleave', (event) => this.onMouseUp(event)); // Cancel drag if mouse leaves

    let lastTime = 0;
    const updateInterval = 600;

    const tick = (currentTime: number) => {
      const timeElapsed = currentTime - lastTime;

      if (timeElapsed > updateInterval) {
        this.TickCycle();
        lastTime = currentTime;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  BuildInventory = () => {
    this.bank.forEach((e) => {
      this.inventory.push(e);
    });
    // Fill up the rest of the inventory slots with empty items
    while (this.inventory.length < 28) {
      this.inventory.push(this.empty_item);
    }
    this.drawInventory();
  };

  empty_item: item = {
    name: '',
    slot: slot.none,
    link: '',
    outline: 'transparent',
  };

  Unequip = (item: item) => {
    this.inventory.splice(
      this.inventory.findIndex((e) => e.slot === slot.none),
      1,
      item
    );
  };

  Equip = (item: item, item_index: number) => {
    this.RemoveFromInventory(item_index);
    if (item.slot === slot.helm) {
      if (this.equipment.helm) {
        this.Unequip(this.equipment.helm);
      }
      this.equipment.helm = item;
    } else if (item.slot === slot.amulet) {
      if (this.equipment.amulet) {
        this.Unequip(this.equipment.amulet);
      }
      this.equipment.amulet = item;
    } else if (item.slot === slot.cape) {
      if (this.equipment.cape) {
        this.Unequip(this.equipment.cape);
      }
      this.equipment.cape = item;
    } else if (item.slot === slot.body) {
      if (this.equipment.body) {
        this.Unequip(this.equipment.body);
      }
      this.equipment.body = item;
    } else if (item.slot === slot.legs) {
      if (this.equipment.legs) {
        this.Unequip(this.equipment.legs);
      }
      this.equipment.legs = item;
    } else if (item.slot === slot.weapon) {
      if (item.dual) {
        if (!!this.equipment.shield) {
          this.Unequip(this.equipment.shield);
        }
        this.equipment.shield = this.empty_item;
      }
      if (this.equipment.weapon) {
        this.Unequip(this.equipment.weapon);
      }
      this.equipment.weapon = item;
    } else if (item.slot === slot.shield) {
      if (this.equipment.shield) {
        this.Unequip(this.equipment.shield);
      }
      this.equipment.shield = item;
    } else if (item.slot === slot.ammo) {
      if (this.equipment.ammo) {
        this.Unequip(this.equipment.ammo);
      }
      this.equipment.ammo = item;
    } else if (item.slot === slot.gloves) {
      if (this.equipment.gloves) {
        this.Unequip(this.equipment.gloves);
      }
      this.equipment.gloves = item;
    } else if (item.slot === slot.boots) {
      if (this.equipment.boots) {
        this.Unequip(this.equipment.boots);
      }
      this.equipment.boots = item;
    } else if (item.slot === slot.ring) {
      if (this.equipment.ring) {
        this.Unequip(this.equipment.ring);
      }
      this.equipment.ring = item;
    } else if (item.slot === slot.none) {
      this.equipment.none = item;
    }
  };

  TickCycle() {
    for (let i = 0; i < this.action_queue.length; i++) {
      this.Equip(this.action_queue[i].item, this.action_queue[i].index);
    }
    this.action_queue = [];
    this.clicked_indexes = [];
    this.drawInventory();
    this.drawEquipment();
  }

  RemoveFromInventory = (index: number) => {
    this.inventory[index] = this.empty_item;
  };

  drawInventory() {
    const canvas = this.inventoryCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create an offscreen canvas to prevent flickering
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');
    if (!offscreenCtx) return;

    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;

    const itemSize = 54; // Item size (width and height)
    const padding = 2; // Padding between items
    const outerPadding = 10; // Outer padding around the inventory

    // Load background image and draw it to cover the entire canvas
    const backgroundImage = new Image();
    backgroundImage.src = './assets/Inventory_tab.png'; // Replace with your background image path
    backgroundImage.onload = () => {
      // Draw the background image stretched to fit the entire canvas
      offscreenCtx.drawImage(
        backgroundImage,
        0,
        0,
        offscreenCanvas.width,
        offscreenCanvas.height
      );

      // Draw the inventory grid items on top of the background
      this.inventory.forEach((item, index) => {
        if (item.link) {
          const col = index % 4; // Column index
          const row = Math.floor(index / 4); // Row index

          // Apply padding to the grid, leaving outerPadding space around the whole grid
          const x = outerPadding + col * (itemSize + padding);
          const y = outerPadding + row * (itemSize + padding);

          const img = new Image();
          img.src = item.link;
          img.onload = () => {
            const aspectRatio = img.width / img.height;
            let targetWidth = itemSize;
            let targetHeight = itemSize;

            // Scale the image to maintain its aspect ratio inside the fixed-size box
            if (aspectRatio > 1) {
              targetHeight = itemSize / aspectRatio;
            } else if (aspectRatio < 1) {
              targetWidth = itemSize * aspectRatio;
            }

            // Draw item image centered inside the clickbox
            offscreenCtx.drawImage(
              img,
              x + (itemSize - targetWidth) / 2,
              y + (itemSize - targetHeight) / 2,
              targetWidth,
              targetHeight
            );

            // Draw the outline (clickbox) around the fixed-size item box
            offscreenCtx.strokeStyle = item.outline; // Set the outline color (based on item)
            offscreenCtx.lineWidth = 3; // Set border thickness
            offscreenCtx.strokeRect(
              x,
              y,
              itemSize,
              itemSize // Draw the fixed-size clickbox outline
            );

            // Once all items are rendered, copy the offscreen canvas to the main canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(offscreenCanvas, 0, 0);
          };
        }
      });
    };
  }

  // Handle mouse down to start dragging an item
  onMouseDown(event: MouseEvent) {
    const canvas = this.inventoryCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridColumns = 4;
    const itemSize = 54;
    const padding = 2;
    const outerPadding = 10; // Adjust padding as needed

    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    const col = Math.floor((mouseX - outerPadding) / (itemSize + padding));
    const row = Math.floor((mouseY - outerPadding) / (itemSize + padding));
    const index = row * gridColumns + col;

    // Check if the clicked index is within valid bounds
    if (index >= 0 && index < this.inventory.length) {
      const clickedItem = this.inventory[index];
      if (clickedItem.link) {
        this.draggingItem = clickedItem;
        this.draggingIndex = index;
        this.draggingPosition = { x: mouseX, y: mouseY };
      }
    }
  }

  // Handle mouse move to update the position of the dragged item
  onMouseMove(event: MouseEvent) {
    if (this.draggingItem) {
      this.draggingPosition = { x: event.offsetX, y: event.offsetY };
      this.scheduleRedrawInventory(); // Schedule a redraw only when needed
    }
  }

  // Handle mouse up to drop the item and swap positions
  onMouseUp(event: MouseEvent) {
    if (!this.draggingItem || this.draggingIndex === null) return;

    const canvas = this.inventoryCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridColumns = 4;
    const itemSize = 54;
    const padding = 2;
    const outerPadding = 10;

    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    const col = Math.floor((mouseX - outerPadding) / (itemSize + padding));
    const row = Math.floor((mouseY - outerPadding) / (itemSize + padding));
    const index = row * gridColumns + col;

    if (
      index >= 0 &&
      index < this.inventory.length &&
      index !== this.draggingIndex
    ) {
      const swappedItem = this.inventory[index];
      this.inventory[index] = this.draggingItem;
      this.inventory[this.draggingIndex] = swappedItem;

      // After the swap, redraw the inventory and equipment
      this.drawInventory();
      this.drawEquipment();
    }

    // Reset dragging state
    this.draggingItem = null;
    this.draggingIndex = null;
    this.draggingPosition = null;
  }
  // Method to schedule a redraw of the inventory, optimized using requestAnimationFrame
  redrawScheduled: boolean = true;
  scheduleRedrawInventory() {
    if (this.redrawScheduled) return;
    this.redrawScheduled = true;

    requestAnimationFrame(() => {
      this.redrawInventory();
      this.redrawScheduled = false;
    });
  }

  // Perform the actual redraw of the inventory
  redrawInventory() {
    const canvas = this.inventoryCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const itemSize = 54;
    const padding = 2;
    const outerPadding = 10;
    const gridColumns = 4;

    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');
    if (!offscreenCtx) return;

    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;

    const backgroundImage = new Image();
    backgroundImage.src = './assets/Inventory_tab.png';
    backgroundImage.onload = () => {
      offscreenCtx.drawImage(
        backgroundImage,
        0,
        0,
        offscreenCanvas.width,
        offscreenCanvas.height
      );

      // Draw items in the grid
      this.inventory.forEach((item, index) => {
        if (item.link) {
          const col = index % gridColumns;
          const row = Math.floor(index / gridColumns);
          const x = outerPadding + col * (itemSize + padding);
          const y = outerPadding + row * (itemSize + padding);

          const img = new Image();
          img.src = item.link;
          img.onload = () => {
            const aspectRatio = img.width / img.height;
            let targetWidth = itemSize;
            let targetHeight = itemSize;

            if (aspectRatio > 1) targetHeight = itemSize / aspectRatio;
            else if (aspectRatio < 1) targetWidth = itemSize * aspectRatio;

            offscreenCtx.drawImage(
              img,
              x + (itemSize - targetWidth) / 2,
              y + (itemSize - targetHeight) / 2,
              targetWidth,
              targetHeight
            );

            offscreenCtx.strokeStyle = item.outline;
            offscreenCtx.lineWidth = 3;
            offscreenCtx.strokeRect(x, y, itemSize, itemSize);
          };
        }
      });

      // Draw the dragging item if it's being dragged
      if (this.draggingItem && this.draggingPosition) {
        const item = this.draggingItem;
        const img = new Image();
        img.src = item.link;
        img.onload = () => {
          if (!!!this.draggingPosition) return;
          const x = this.draggingPosition.x - itemSize / 2;
          const y = this.draggingPosition.y - itemSize / 2;

          const aspectRatio = img.width / img.height;
          let targetWidth = itemSize;
          let targetHeight = itemSize;

          if (aspectRatio > 1) targetHeight = itemSize / aspectRatio;
          else if (aspectRatio < 1) targetWidth = itemSize * aspectRatio;

          offscreenCtx.drawImage(
            img,
            x + (itemSize - targetWidth) / 2,
            y + (itemSize - targetHeight) / 2,
            targetWidth,
            targetHeight
          );
        };
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreenCanvas, 0, 0);
    };
  }

  first_render: boolean = true;
  drawEquipment() {
    const canvas = this.equipmentCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');
    if (!offscreenCtx) return;

    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;

    const itemSize = 54; // Item size (width and height)
    const padding = 2; // Padding between items
    const outerPadding = 8; // Outer padding around the equipment grid

    // Equipment slot order
    const equipmentSlots = [
      this.equipment.none,
      this.equipment.helm,
      this.equipment.none,
      this.equipment.cape,
      this.equipment.amulet,
      this.equipment.ammo,
      this.equipment.weapon,
      this.equipment.body,
      this.equipment.shield,
      this.equipment.none,
      this.equipment.legs,
      this.equipment.none,
      this.equipment.gloves,
      this.equipment.boots,
      this.equipment.ring,
    ];

    let loadedImages = 0;
    const totalImages = equipmentSlots.filter((item) => item?.link).length;

    const columns = 3; // 3 columns for the equipment slots
    const rows = Math.ceil(equipmentSlots.length / columns); // Calculate number of rows

    // Load background image and draw it to cover the entire canvas
    const backgroundImage = new Image();
    backgroundImage.src = './assets/Worn_Equipment_tab.png'; // Background image

    // Ensure the background is loaded before proceeding
    backgroundImage.onload = () => {
      // Draw the background
      offscreenCtx.drawImage(
        backgroundImage,
        0,
        0,
        offscreenCanvas.width,
        offscreenCanvas.height
      );

      if (this.first_render) {
        ctx.drawImage(
          backgroundImage,
          0,
          0,
          offscreenCanvas.width,
          offscreenCanvas.height
        );
        this.first_render = false;
      }

      // Process all the equipment slots
      equipmentSlots.forEach((item, index) => {
        if (item && item.link) {
          const img = new Image();
          img.src = item.link;

          img.onload = () => {
            loadedImages++;

            const aspectRatio = img.width / img.height;
            let targetWidth = itemSize;
            let targetHeight = itemSize;

            if (aspectRatio > 1) {
              targetHeight = itemSize / aspectRatio;
            } else if (aspectRatio < 1) {
              targetWidth = itemSize * aspectRatio;
            }

            // Calculate position with outer padding
            const col = index % columns; // Column index
            const row = Math.floor(index / columns); // Row index

            const x = outerPadding + col * (itemSize + padding); // X position with outer padding
            const y = outerPadding + row * (itemSize + padding); // Y position with outer padding

            // Draw item on top of the background
            offscreenCtx.drawImage(
              img,
              x + (itemSize - targetWidth) / 2,
              y + (itemSize - targetHeight) / 2,
              targetWidth,
              targetHeight
            );

            // Once all images are loaded, copy the offscreen canvas to the main canvas
            if (loadedImages === totalImages) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(offscreenCanvas, 0, 0);
            }
          };
        }
      });
    };
  }

  bank: item[] = [
    // melee set
    {
      name: 'Neitiznot faceguard',
      slot: slot.helm,
      link: './assets/Neitiznotfaceguard.png',
      outline: 'red',
    },
    {
      name: 'Amulet of torture',
      slot: slot.amulet,
      link: './assets/Amuletoftorture.png',
      outline: 'red',
    },
    {
      name: 'Infernal Cape',
      slot: slot.cape,
      link: './assets/InfernalCape.png',
      outline: 'red',
    },
    {
      name: 'Fighter torso',
      slot: slot.body,
      link: './assets/Fightertorso.png',
      outline: 'red',
    },
    {
      name: 'Obsidian platelegs',
      slot: slot.legs,
      link: './assets/Obsidianplatelegs.png',
      outline: 'red',
    },
    {
      name: 'Ghrazi rapier',
      slot: slot.weapon,
      link: './assets/Ghrazirapier.png',
      outline: 'red',
    },
    {
      name: 'Dragonfire shield',
      slot: slot.shield,
      link: './assets/Dragonfireshield.png',
      outline: 'red',
    },
    {
      name: 'Ferocious gloves',
      slot: slot.gloves,
      link: './assets/Ferociousgloves.png',
      outline: 'red',
    },
    {
      name: 'Primordial boots',
      slot: slot.boots,
      link: './assets/Primordialboots.png',
      outline: 'red',
    },
    {
      name: 'Berserker ring',
      slot: slot.ring,
      link: './assets/Berserkerring.png',
      outline: 'red',
    },
    {
      name: 'Elder maul',
      slot: slot.weapon,
      dual: true,
      link: './assets/Eldermaul.png',
      outline: 'red',
    },
    // ranged set
    {
      name: 'Crystal helm',
      slot: slot.helm,
      link: './assets/Crystalhelm.png',
      outline: 'green',
    },
    {
      name: 'Necklace of anguish',
      slot: slot.amulet,
      link: './assets/Necklaceofanguish.png',
      outline: 'green',
    },
    {
      name: "Dizana's quiver",
      slot: slot.cape,
      link: "./assets/Dizana'squiver.png",
      outline: 'green',
    },
    {
      name: 'Crystal body',
      slot: slot.body,
      link: './assets/Crystalbody.png',
      outline: 'green',
    },
    {
      name: 'Crystal legs',
      slot: slot.legs,
      link: './assets/Crystallegs.png',
      outline: 'green',
    },
    {
      name: 'Bow of faerdhinen',
      slot: slot.weapon,
      dual: true,
      link: './assets/Bowoffaerdhinen.png',
      outline: 'green',
    },
    {
      name: 'Zaryte vambraces',
      slot: slot.gloves,
      link: './assets/Zarytevambraces.png',
      outline: 'green',
    },
    {
      name: 'Venator Ring',
      slot: slot.ring,
      link: './assets/VenatorRing.png',
      outline: 'green',
    },
    // mage set
    {
      name: 'Ancestral hat',
      slot: slot.helm,
      link: './assets/Ancestralhat.png',
      outline: 'blue',
    },
    {
      name: 'Occult necklace',
      slot: slot.amulet,
      link: './assets/Occultnecklace.png',
      outline: 'blue',
    },
    {
      name: 'Imbued god cape',
      slot: slot.cape,
      link: './assets/Imbuedgodcape.png',
      outline: 'blue',
    },
    {
      name: 'Ancestral robe top',
      slot: slot.body,
      link: './assets/Ancestralrobetop.png',
      outline: 'blue',
    },
    {
      name: 'Ancestral robe bottom',
      slot: slot.legs,
      link: './assets/Ancestralrobebottom.png',
      outline: 'blue',
    },
    {
      name: "Tumeken's shadow",
      slot: slot.weapon,
      dual: true,
      link: "./assets/Tumeken'sshadow.png",
      outline: 'blue',
    },
    {
      name: 'Tormented bracelet',
      slot: slot.gloves,
      link: './assets/Tormentedbracelet.png',
      outline: 'blue',
    },
    {
      name: 'Magus ring',
      slot: slot.ring,
      link: './assets/Magusring.png',
      outline: 'blue',
    },
  ];

  action_queue: { action: string; item: item; index: number }[] = [];
  clicked_indexes: number[] = [];
  // Handle click on the inventory canvas
  handleInventoryClick(event: MouseEvent) {
    const canvas = this.inventoryCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridColumns = 4; // 4 columns
    const itemSize = 54; // Item size
    const padding = 2; // Padding between items

    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    // Calculate the item clicked based on mouse position
    const col = Math.floor(mouseX / (itemSize + padding)); // Column index
    const row = Math.floor(mouseY / (itemSize + padding)); // Row index
    const index = row * gridColumns + col; // Get the index of the clicked item
    if (this.clicked_indexes.includes(index)) return;
    this.clicked_indexes.push(index);

    // Check if the index is within the inventory range
    if (index >= 0 && index < this.inventory.length) {
      const clickedItem = this.inventory[index];
      if (clickedItem.link) {
        this.action_queue.push({
          action: 'equip',
          item: clickedItem,
          index: index,
        });
      }
    }
  }
}

interface item {
  name: string;
  slot: slot;
  link: string;
  dual?: boolean;
  outline: string;
}

enum slot {
  helm,
  amulet,
  cape,
  body,
  legs,
  weapon,
  shield,
  ammo,
  gloves,
  boots,
  ring,
  none,
}

interface equipment {
  helm: item | null;
  amulet: item | null;
  cape: item | null;
  body: item | null;
  legs: item | null;
  weapon: item | null;
  shield: item | null;
  ammo: item | null;
  gloves: item | null;
  boots: item | null;
  ring: item | null;
  none: item | null;
}
