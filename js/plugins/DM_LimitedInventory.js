//-----------------------------------------------------------------------------
// Dungeonmind - Limited Inventory System
// DM_LimitedInventory.js
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.DM_LimitedInventory = true;

var Dungeonmind = Dungeonmind || {};
Dungeonmind.LI = Dungeonmind.LI || {};
Dungeonmind.LI.version = 1.20;

/*:
 * DM_LimitedInventory.js
 * Version 1.20
 *
 * @plugindesc [Rpg Maker MZ] [Tier 1] [Version 1.20] - Create an advanced limited inventory
 * system for your game.
 *
 * @url https://www.dmplugins.com
 * @target MZ
 * @author Dungeonmind
 *
 *
 * @param Storage Containers
 * @text Storage Containers
 * @type struct<storageContainers>[]
 * @default ["{\"Container Name\":\"Container\",\"Container Icon\":\"210\",\"Max Storage\":\"1000\",\"Items\":\"\",\"Weapons\":\"[\\\"{\\\\\\\"Weapon Id\\\\\\\":\\\\\\\"25\\\\\\\",\\\\\\\"Amount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"Armors\":\"\",\"Loot Container\":\"false\"}"]
 * @desc Configure storage containers for your game. Changing the
 * order will match the id with the index.
 *
 * @param Inventory Title Text
 * @desc Set the text for the inventory max weight window.
 * Default : \c[1]Inventory\c[0]
 * @default \c[1]Inventory\c[0]
 *
 * @param Starting Inventory Max Weight
 * @desc Set the starting inventory max allowed items.
 * Default: 120
 * @type number
 * @default 120
 * @min 1
 *
 * @param Default Item Max
 * @desc Change this if you want to override MZ max item limit.
 * Default : 99
 * @type number
 * @min 1
 * @max 9999
 * @default 99
 *
 * @param Item List Columns
 * @desc Set the default max columns for containers and party inventory.
 * @type number
 * @min 1
 * @default 2
 *
 * @param Inventory Type
 * @desc Choose what type of limited inventory system you want.
 * Slot Based: ignores item weight after first item.
 * @type select
 * @option Item Weight
 * @option Slot Based
 * @default Item Weight 
 *
 * @param Item SE
 * @desc Set default sound effect that's played when an item is
 * deposited, withdrawn, or dropped.
 * @type file
 * @default Equip3
 * @dir audio/se/
 *
 * @param Weapon SE
 * @desc Set default sound effect that's played when a weapon is
 * deposited, withdrawn, or dropped.
 * @type file
 * @default Equip2
 * @dir audio/se/
 *
 * @param Armor SE
 * @desc Set default sound effect that's played when an armor is
 * deposited, withdrawn, or dropped.
 * @type file
 * @default Equip2
 * @dir audio/se/
 *
 * @param Inventory Icon
 * @desc Choose the icon you want to represent the party's inventory
 * in all limited inventory scenes.
 * @default 210
 *
 * @param Item Count Symbol Text
 * @desc Change the default value from ':' to whatever
 * you want like some games use 'x' symbol.
 * @default :
 *
 * @param Infinite Symbol Text
 * @desc Set the symbol/text you want to use for containers that
 * have infinite max weight.
 * @default ∞
 *
 * @param Item Layout
 * @type select
 * @option RPG Maker Default
 * @option VisuMZ_4_VisualItemInv
 * @desc Choose the layout for the way items are drawn.
 * VisuMZ_4_VisualItemInv (place below DM Plugins)
 * @default RPG Maker Default
 *
 * @param Inventory Mechanics
 * @type select
 * @option Restrictive
 * @option Relaxed
 * @desc Should players be held in item/container scene when over
 * the max weight limit and forced to drop items?
 * @default Restrictive
 *
 * @param Item Action Weight Window
 * @desc Show the Item Weight in the party inventory
 * scene at the bottom in a small window?
 * @type boolean
 * @on YES
 * @off NO
 * @default true 
 *
 * @param Item Weight Text
 * @parent Item Action Weight Window
 * @desc Set the text for the item weight window.
 * Default : Item Weight
 * @default Item Weight
 *
 * @param Item Weight Window Width
 * @parent Item Action Weight Window
 * @desc Set the Storage Item Weight Window Width.
 * Default : 487
 * @type number
 * @default 487
 *
 * @param Item Weight Text X Offset
 * @parent Item Action Weight Window
 * @desc Set the X offset for the Item Weight Text.
 * Negative moves text to the left and positive to the right.
 * @default 0
 *
 * @param Item Weight Numbers X Offset
 * @parent Item Action Weight Window
 * @desc Set the X offset for the Item Weight Numbers.
 * Negative moves text to the left and positive to the right.
 * @default 0
 *
 * @param Item Weight Icon
 * @parent Item Action Weight Window
 * @desc Choose the icon you want to use for the weight symbol.
 * Default 313
 * @default 313
 *
 * @param Item Amount Text
 * @parent Item Action Weight Window
 * @desc Set the text for item amount withdraw/deposit header.
 * Default : Amount
 * @default Amount
 *
 * @param Item Default Quantity
 * @parent Item Action Weight Window
 * @type number
 * @max 1
 * @desc Set the default amount the item action window starts
 * with.
 * @default 1
 *
 * @help
 *
 * ===========================================================================
 * Terms and Condtions
 * ===========================================================================
 *
 * You may use this plugin for free in a non-commercial game only. However, 
 * commercial license is available. Read down below. Please credit me as
 * Dungeonmind or Justin Lamarche.
 *
 * Don't take any code for your own released plugins. You can edit the code 
 * for your own projects only.
 *
 * You must obtain a license from www.dmplugins.com before using this plugin
 * in a commercial project. More information about that license can be found
 * on the plugin page you downloaded it from.
 *
 * I am not responsible or liable if you choose to use this plugin in your
 * project. It is up to you to figure out if its a right fit (part of the 
 * reason why the full version is always available for you to download and 
 * try out first).
 *
 * What I can Promise : I won't just disappear, I am a full time game dev and
 * my plugins will be kept up to date. Just make sure you have the latest build
 * by visiting the plugin page for the one you want.
 *
 * ===========================================================================
 * Warning!
 * ===========================================================================
 *
 * PLEASE CAREFULLY READ YOUR LICENCE THAT IS AVAILABLE ON THE PLUGIN PAGE YOU
 * DOWNLOADED FROM DMPLUGINS.COM. IF YOU WANT TO USE ANY PLUGIN MADE BY ME IN
 * IN A COMMERCIAL PROJECT, YOU MIGHT HAVE TO BUY THE APPROPRIATE LICENCE FIRST. 
 * (ALSO, AVAILABLE ON THE PLUGIN PAGE.)
 *
 * I am not responsible if this plugin doesn't work for other versions of 
 * rpg maker MZ other than the latest version, 1.8.0. Please report any bugs
 * in the comments on dmplugins.com
 *
 * ===========================================================================
 * How to Use
 * ===========================================================================
 * 
 * This plugin will create a new limited inventory system for your game. It's 
 * not likely it will work well with other plugins that affect the item scene. 
 * The party will now have a maximum weight limit.
 *
 * Storage containers can be created for the player to store items, weapons, 
 * and armour in. You can set the starting maximum weight, icon, name, items, 
 * weapons, and armour in the plugin parameters. These containers can later 
 * be manipulated through plugin commands and script calls to change or check 
 * these values.
 *
 * There are some features and information that is not explained here. Please
 * read the full documentation available at dmplugins.com
 *
 * ===========================================================================
 * Important information if you're using VisuMZ_4_VisualItemInv!!!
 * ===========================================================================
 * You must add 'Window_ItemContainer' to the Applied Windows parameter in
 * VisuStella's plugin and place VisuMZ_4_VisualItemInv above all DM plugins. 
 * 
 * You must also activate the "Item Layout" plugin parameter for this plugin
 * and select "VisuMZ_4_VisualItemInv".
 *
 * ===========================================================================
 * Note tags for $dataItems, $dataWeapons and $dataArmors
 * ===========================================================================
 * 
 * ---------------------------------------------------------------------------
 * <itemWeight:value>
 * ---------------------------------------------------------------------------
 * *Set a custom weight tag for this item. (Can be a decimal or larger than 1)
 *
 * Examples :
 * <itemWeight:0.1>
 * <itemWeight:14>
 * ➔ This can allow for some versatility in your game design. Oblivion comes
 * to mind here, when making items cost less than 1 or more.
 *
 * ---------------------------------------------------------------------------
 * <maxWeight:value>
 * ---------------------------------------------------------------------------
 * *Adds or subtracts the value from the party max weight while the item is
 * currently in the players inventory.
 *
 * Examples :
 * <maxWeight:0.1>
 * <maxWeight:14>
 * ➔ This can allow for some versatility in your game design. Oblivion comes
 * to mind here, when making items cost less than 1 or more.
 *
 * ---------------------------------------------------------------------------
 * <itemSE:filename>
 * ---------------------------------------------------------------------------
 * *Set the sound effect it plays when the item is deposited, withdrawn or
 * dropped. This will override the default SE if its set in the plugin
 * parameters.
 *
 * Example :
 * <itemSE:Sword2>
 * ➔ When the item, weapon or armor is deposited or withdrawn from a container
 * it will play the sound effect with filename : Sword2
 *
 * ---------------------------------------------------------------------------
 * <undepositable>
 * ---------------------------------------------------------------------------
 * *Set the item, weapon, armor to not be allowed in the containers.
 *
 * Example :
 * <undepositable>
 * ➔ This notetag doesn't need a value and it will prevent deposit on its 
 * own.
 *
 * ---------------------------------------------------------------------------
 * <undroppable>
 * ---------------------------------------------------------------------------
 * *Set the item, weapon, armor to not be allowed to drop.
 *
 * Example:
 * <undroppable>
 * ➔ This notetag doesn't need a value and it will prevent dropping on its 
 * own.
 *
 * ===========================================================================
 * Note tags for $dataStates
 * ===========================================================================
 * 
 * ---------------------------------------------------------------------------
 * <maxWeight:value>
 * ---------------------------------------------------------------------------
 * *Set a bonus max weight tag. When an actor is affected with the state, 
 * the party will gain/lose the value set. When they lose the state, the
 * party will return to normal max weight (decimals allowed). Party members 
 * in the reserve are excluded.
 *
 * Examples :
 * <maxWeight:10>
 * ➔ This will add 10 to the maximum party weight limit.
 * <maxWeight:-10>
 * ➔ This will subtract 10 from the maximum party weight limit.
 *
 * ===========================================================================
 * Note tags for $dataActors
 * ===========================================================================
 * 
 * ---------------------------------------------------------------------------
 * <maxWeight:value>
 * ---------------------------------------------------------------------------
 * *Set the actors individual max weight. By setting the party weight to 0,
 * you can make the party max weight based on the current actors in the party
 * instead (decimals allowed). Party members in the reserve are excluded.
 *
 * Examples :
 * <maxWeight:100>
 * ➔ This will add 100 to the maximum party weight limit.
 * <maxWeight:-100>
 * ➔ This will subtract 100 from the maximum party weight limit.
 *
 * ===========================================================================
 * Note tags for $dataWeapons & $dataArmors
 * ===========================================================================
 * 
 * ---------------------------------------------------------------------------
 * <equipWeight:value>
 * ---------------------------------------------------------------------------
 * *Set the weapon or armor to increase/decrease the party max weight by the 
 * value when an actor has the weapon or armor equipped (decimals allowed). 
 * Party members in the reserve are excluded.
 *
 * Examples :
 * <maxWeight:100>
 * ➔ This will add 100 to the maximum party weight limit.
 * <maxWeight:-100>
 * ➔ This will subtract 100 from the maximum party weight limit.
 *
 * ===========================================================================
 * Script Calls
 * ===========================================================================
 * 
 * ---------------------------------------------------------------------------
 * $gameContainers.changeInventoryMaxWeight(value);
 * ---------------------------------------------------------------------------
 * *Changes the current max weight for the new limited party inventory.
 *
 * value ➔ It's a number. Positive increases limit, while negative decreases it.
 *
 * Examples :
 * $gameContainers.changeInventoryMaxWeight(20);
 *  ➔ Increases Party Limited Inventory by 20.
 * $gameContainers.changeInventoryMaxWeight(-20);
 *  ➔ Decreases Party Limited Inventory by 20.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.changeStorageContainerMaxWeight(id, amount);
 * ---------------------------------------------------------------------------
 * *Changes max weight for the container that matches ID by AMOUNT.
 * 
 * id ➔ It's a number. The Container ID you want to change max weight for.
 *
 * amount ➔ It's a number. Positive increases limit, while negative decreases it.
 *
 * Examples :
 * $gameContainers.changeStorageContainerMaxWeight(1, 20);
 *  ➔ Increases container max weight with ID 1 by 20.
 * $gameContainers.changeStorageContainerMaxWeight(3, -30);
 *  ➔ Decreases container max weight with ID 3 by 30.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.openContainer(id);
 * ---------------------------------------------------------------------------
 * *Opens the created container with the following argument.
 *
 * id ➔ Choose the unique id of the  container you want to open.
 * 
 * Examples :
 * $gameContainers.openContainer(3);
 *  ➔ Opens the container with ID 3.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.createContainer(name, maxStorage, storageIconId, 
 * containerLoot, variableId);
 * ---------------------------------------------------------------------------
 * *Creates a new container and adds it to the current save file's pool of
 * containers for use.
 *
 * name ➔ It's a string. Text Codes allowed.
 * maxStorage ➔ It's a number.
 * storageIconId ➔ It's a number. The index of the icon you want to use.
 * 0 to use no icon.
 * containerLoot ➔ It's a boolean. true or false. Is it a loot container?
 * Loot containers can't take items from the player (hides max weight).
 * variableId ➔ It's a number. The ID of the variable you want to use to 
 * store the newly created container's ID.
 * 
 * Example :
 * $gameContainers.createContainer("Container", 1000, 7, false, 3);
 *  ➔ Creates a brand new container named "Container" with a 1000 max weight, 
 * with icon ID 7. The container is not a loot container, and the variable ID 
 * to store the newly created container's ID is 3.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.setInventoryMechanics(value);
 * ---------------------------------------------------------------------------
 * *It's a String. Only accepts 1 of 2 values ("Relaxed" or "Restrictive").
 *
 * "Relaxed" ➔ Players won't be forced to drop items before leaving the inventory
 * or container scenes.
 * "Restrictive" ➔ Players will be forced to drop items before leaving the inventory
 * or container scenes.
 * 
 * Examples :
 * $gameContainers.setInventoryMechanics("Relaxed");
 *  ➔ This will change the game mechanics for this save file to "Relaxed".
 *
 * $gameContainers.setInventoryMechanics("Restrictive");
 *  ➔ This will change the game mechanics for this save file to "Restrictive".
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.addItemToContainer(containerId, itemId, amount);
 * ---------------------------------------------------------------------------
 * *Adds certain amount of item with itemId to container with containerID.
 *
 * Examples :
 * $gameContainers.addItemToContainer(2, 7, 47);
 *  ➔ Adds 47 of item with id 7 to container 2.
 * $gameContainers.addItemToContainer(1, 10, 88);
 *  ➔ Adds 88 of item with id 10 to container 1.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.addWeaponToContainer(containerId, weaponId, amount);
 * ---------------------------------------------------------------------------
 * *Adds certain amount of weapon with weaponId to container with containerID.
 *
 * Examples :
 * $gameContainers.addWeaponToContainer(5, 3, 2);
 *  ➔ Adds 2 of weapon with id 3 to container 5.
 * $gameContainers.addWeaponToContainer(2, 12, 8);
 *  ➔ Adds 8 of weapon with id 12 to container 2.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.addArmorToContainer(containerId, armorId, amount);
 * ---------------------------------------------------------------------------
 * *Adds certain amount of armor with armorId to container with containerID.
 *
 * Examples :
 * $gameContainers.addArmorToContainer(10, 4, 5);
 *  ➔ Adds 5 of armor with id 4 to container 10.
 * $gameContainers.addArmorToContainer(9, 42, 6);
 *  ➔ Adds 6 of armor with id 42 to container 9.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.takeItemFromContainer(containerId, itemId, amount);
 * ---------------------------------------------------------------------------
 * *Takes certain amount of item with itemId From container with containerID.
 *
 * Examples :
 * $gameContainers.takeItemFromContainer(2, 7, 1);
 *  ➔ Takes 1 of item with id 7 from container 2.
 * $gameContainers.takeItemFromContainer(1, 10, 2);
 *  ➔ Takes 2 of item with id 10 from container 1.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.takeWeaponFromContainer(containerId, weaponId, amount);
 * ---------------------------------------------------------------------------
 * *Takes certain amount of weapon with weaponId From container with containerID.
 *
 * Examples :
 * $gameContainers.takeWeaponFromContainer(4, 2, 1);
 *  ➔ Takes 1 of weapon with id 2 from container 4.
 * $gameContainers.takeWeaponFromContainer(13, 20, 3);
 *  ➔ Takes 3 of weapon with id 20 from container 13.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.takeArmorFromContainer(containerId, armorId, amount);
 * ---------------------------------------------------------------------------
 * *Takes certain amount of armor with armorId From container with containerID.
 *
 * Examples :
 * $gameContainers.takeArmorFromContainer(4, 2, 1);
 *  ➔ Takes 1 of armor with id 2 from container 4.
 * $gameContainers.takeArmorFromContainer(13, 20, 3);
 *  ➔ Takes 3 of armor with id 20 from container 13.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.takeAllContainersContents(containerIds);
 * ---------------------------------------------------------------------------
 * It's a string of numbers representing container IDs. This function will 
 * take all contents from containers you list and add them to the player 
 * inventory and ignore default item max limits, as well as inventory max 
 * weight. This is useful for crafting or quest circumstances.
 * 
 * Examples :
 * $gameContainers.takeAllContainersContents('1, 2, 3');
 *  ➔ Takes ALL item contents from containers with ID 1, 2, and 3
 * and adds them to the player inventory.
 * $gameContainers.takeAllContainersContents('1, 3, 5');
 *  ➔ Takes ALL item contents from containers with ID 1, 3, and 5.
 * and adds them to the player inventory.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.putBackContainersContents();
 * ---------------------------------------------------------------------------
 * This script call takes no arguments. It puts back all the container(s) 
 * items, weapons, and armour that were removed with the above script call, 
 * but if the player no longer has the available items, it will put back as 
 * much as possible. You must use this script call before taking more items 
 * from containers again.
 *
 * Examples :
 * $gameContainers.putBackContainersContents();
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.callItemScene();
 * ---------------------------------------------------------------------------
 * This script call takes no arguments. It calls the item scene from the map.
 * This is very useful if you want to force the player to make space in the
 * party inventory after doing a conditional script call to see if the player
 * is over the party's maximum weight.
 *
 * Examples :
 * $gameContainers.callItemScene();
 *
 * ===========================================================================
 * Conditional Script Calls
 * ===========================================================================
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.checkPartyHaveSpaceForItem(itemId, amount);
 * ---------------------------------------------------------------------------
 * *Put this in a conditional branch event command script option and you can
 * check if the party has enough room for the X amount of itemId.
 *
 * Examples :
 * $gameContainers.checkPartyHaveSpaceForItem(1, 3);
 *  ➔ Checks to see if the party has room for 3 of item id 1.
 * $gameContainers.checkPartyHaveSpaceForItem(22, 5);
 *  ➔ Checks to see if the party has room for 5 of item id 22.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.checkPartyHaveSpaceForWeapon(weaponId, amount);
 * ---------------------------------------------------------------------------
 * *Put this in a conditional branch event command script option and you can
 * check if the party has enough room for the X amount of weaponId.
 * 
 * Examples :
 * $gameContainers.checkPartyHaveSpaceForWeapon(3, 7);
 *  ➔ Checks to see if the party has room for 7 of weapon id 3.
 * $gameContainers.checkPartyHaveSpaceForWeapon(30, 10);
 *  ➔ Checks to see if the party has room for 10 of weapon id 30.
 * 
 * ---------------------------------------------------------------------------
 * $gameContainers.checkPartyHaveSpaceForArmor(armorId, amount);
 * ---------------------------------------------------------------------------
 * *Put this in a conditional branch event command script option and you can
 * check if the party has enough room for the X amount of armorId.
 *
 * Examples :
 * $gameContainers.checkPartyHaveSpaceForArmor(25, 6);
 *  ➔ Checks to see if the party has room for 6 of weapon id 25.
 * $gameContainers.checkPartyHaveSpaceForArmor(32, 100);
 *  ➔ Checks to see if the party has room for 100 of weapon id 32.
 *
 * ---------------------------------------------------------------------------
 * $gameContainers.getContainerItemCount(containerId);
 * ---------------------------------------------------------------------------
 * It's a number representing the ID of the container you want to check how
 * many items are currently in the containers contents.
 * 
 * Examples :
 * $gameContainers.getContainerItemCount(2);
 *  ➔ Returns how many items are in the container's contents for
 * container ID 2.
 * $gameContainers.getContainerItemCount(5);
 *  ➔ Returns how many items are in the container's contents for
 * container ID 5.
 *
 * @param Window_Help (Terms)
 * @default
 * 
 * @param Surpass Max Inv. Weight
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text displayed when the party's max weight has been 
 * exceeded in the item scene (text codes allowed).
 * @default "\\c[2]The party is currently over the maximum weight limit; \nplease drop some items!\\c[0]"
 *
 * @param Surpass Max Inv. Weight 2
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text displayed when the party's max weight has been 
 * exceeded in the container scene (text codes allowed).
 * @default "\\c[2]The party is currently over the maximum weight limit; \nplease deposit/drop some items first!\\c[0]"
 *
 * @param Surpass Max Cont. Weight
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text displayed when the container's max weight
 * has been exceeded (text codes allowed).
 * @default "\\c[2]There is not enough available space in this container!\nTry removing some items first.\\c[0]"
 *
 * @param Item Cannot Be Dropped
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text Displayed when an item is not allowed
 * to be dropped (text codes allowed).
 * @default "This item cannot be dropped."
 *
 * @param Item Cannot Be Deposited
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text displayed when an item is not allowed
 * to be deposited (text codes allowed).
 * @default "This item cannot be deposited."
 *
 * @param Container Items Disallowed
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text displayed when the container can't take any items
 * (text codes allowed).
 * @default "This container cannot take any items."
 *
 * @param Item Action Window Text
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text displayed when activating the item action window 
 * (text codes allowed).
 * @default "Select an action."
 *
 * @param Container Cat. Text
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text displayed when activating the container's category
 * window (text codes allowed).
 * @default "Do you want to withdraw or deposit?"
 *
 * @param On Action Drop Text
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text displayed when action drop is selected
 * (text codes allowed).
 * @default "How many do you want to drop? Press & hold SHIFT to\nincrease/decrease by x10."
 *
 * @param On Action Item Deposit
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text displayed when deposit is selected
 * (text codes allowed).
 * @default "Deposit how much? Press & hold SHIFT to increase/decrease\nby x10."
 *
 * @param On Action Item Withdraw
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text displayed when withdraw is selected
 * (text codes allowed).
 * @default "Withdraw how much? Press & hold SHIFT to increase/decrease\nby x10."
 *
 * @param No Item To Deposit
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text displayed when there is no item to deposit
 * (text codes allowed).
 * @default "There is no item to deposit."
 *
 * @param No Item To Withdraw
 * @type note
 * @parent Window_Help (Terms)
 * @desc Text displayed when there is no item to withdraw
 * (text codes allowed).
 * @default "There is no item to withdraw."
 *
 * @command changePartyMaxWeight
 * @text Change Party Max Weight
 * @desc Change the party max weight.
 *
 * @arg amount
 * @text Amount
 * @desc The amount to change party max weight to by.
 * Positive increases max weight, negative decreases it.
 *
 * @command openContainer 
 * @text Open Storage Container
 * @desc Open a Storage Container set by either script call or parameters. 
 *
 * @arg containerId
 * @text Container ID
 * @default 1
 * @type number
 * @min 1
 * @desc Choose the container you want to open by ID.
 *
 * @command createContainer
 * @text Create New Container
 * @desc This command will create a new container and add it to the 
 * current save file's pool of containers for use (at the end).
 *
 * @arg name
 * @text Container Name
 * @desc It's a string. Colour Text codes allowed. Don't use quotes
 * because plugin command converts values to string already.
 * @default \c[2]Container
 * 
 * @arg maxStorage
 * @type number
 * @text Max Storage
 * @desc It's a number. 
 * Set the max amount of items this container can store.
 * @default 500
 *
 * @arg storageIconId
 * @text Storage Icon ID
 * @desc It's a number. Set the icon index you want to use for the
 * new container (0 for no icon).
 * @default 0
 *
 * @arg containerLoot
 * @type boolean
 * @on YES
 * @off NO
 * @text Loot Container
 * @desc Set this to a loot container? Loot containers can't take 
 * items from the player (hides max weight).
 * @default false
 *
 * @arg variableId
 * @type variable
 * @text Variable ID
 * @desc It's a number. The ID of the variable you want to use to 
 * store this container's ID.
 * @default 0
 *
 * @command setInventoryMechanics
 * @text Set Inventory Mechanics
 * @desc Should players be held in item/container scene when over
 * the max weight limit and forced to drop items?
 *
 * @arg inventoryMechanics
 * @text Inventory Mechanics
 * @type select
 * @option Relaxed
 * @option Restrictive
 * @desc This parameter accepts 1 of 2 values (Relaxed or Restrictive).
 * @default Relaxed
 *
 * @command changeContainerMaxWeight 
 * @text Change Container Max Weight
 * @desc Changes the max weight for container that matches ID.
 *
 * @arg containerId
 * @text Container ID
 * @default 1
 * @type number
 * @min 1
 * @desc The Container ID you want to change max weight for.
 *
 * @arg amount
 * @text Amount
 * @desc The amount to change containers max weight to by.
 * It's a number. Positive increases max weight, negative decreases it.
 *
 * @command addItemToContainer
 * @text Add Item To Container
 * @desc Add an item to the containerId.
 *
 * @arg containerId
 * @text Container ID
 * @default 1
 * @type number
 * @min 1
 * @desc The Container ID you want to add the item to.
 *
 * @arg itemId
 * @text Item Id
 * @type item
 * @desc Choose the item you want to add.
 *
 * @arg amount
 * @text Amount
 * @desc The amount of the item to add.
 * @type number
 * @default 1
 * @min 1
 *
 * @command addWeaponToContainer
 * @text Add Weapon To Container
 * @desc Add a weapon to the containerId.
 *
 * @arg containerId
 * @text Container ID
 * @default 1
 * @type number
 * @min 1
 * @desc The Container ID you want to add the weapon to.
 *
 * @arg weaponId
 * @text Weapon Id
 * @type weapon
 * @desc Choose the weapon you want to add.
 *
 * @arg amount
 * @text Amount
 * @desc The amount of the weapon to add.
 * @type number
 * @default 1
 * @min 1
 *
 * @command addArmorToContainer
 * @text Add Armor To Container
 * @desc Add a armor to the containerId.
 *
 * @arg containerId
 * @text Container ID
 * @default 1
 * @type number
 * @min 1
 * @desc The Container ID you want to add the armor to.
 *
 * @arg armorId
 * @text Armor Id
 * @type armor
 * @desc Choose the armor you want to add.
 *
 * @arg amount
 * @text Amount
 * @desc The amount of the armor to add.
 * @type number
 * @default 1
 * @min 1
 *
 * @command takeItemFromContainer
 * @text Take Item From Container.
 * @desc Take an item from the containerId and discard it.
 *
 * @arg containerId
 * @text Container ID
 * @default 1
 * @type number
 * @min 1
 * @desc The Container ID you want to take the item from.
 *
 * @arg itemId
 * @text Item Id
 * @type item
 * @desc Choose the item you want to take.
 *
 * @arg amount
 * @text Amount
 * @desc The amount of the item to take.
 * @type number
 * @default 1
 * @min 1
 *
 * @command takeWeaponFromContainer
 * @text Take Weapon From Container.
 * @desc Take an weapon from the containerId and discard it.
 *
 * @arg containerId
 * @text Container ID
 * @type number
 * @default 1
 * @min 1
 * @desc The Container ID you want to take the weapon from.
 *
 * @arg weaponId
 * @text Weapon Id
 * @type weapon
 * @desc Choose the weapon you want to take.
 *
 * @arg amount
 * @text Amount
 * @desc The amount of the weapon to take.
 * @type number
 * @default 1
 * @min 1
 *
 * @command takeArmorFromContainer
 * @text Take Armor From Container.
 * @desc Take an Armor from the containerId and discard it.
 *
 * @arg containerId
 * @text Container ID
 * @type number
 * @default 1
 * @min 1
 * @desc The Container ID you want to take the armor from.
 *
 * @arg armorId
 * @text Armor Id
 * @type armor
 * @desc Choose the armor you want to take.
 *
 * @arg amount
 * @text Amount
 * @desc The amount of the armor to take.
 * @type number
 * @default 1
 * @min 1
 *
 * @command takeAllContainersContents
 * @text Take All Container(s) Contents.
 * @desc Take all contents from a list of container ID's.
 *
 * @arg containerIds
 * @text Container IDs
 * @default 1, 2, 3
 * @desc The Container IDs you want to take all the contents from.
 * It's numbers seperated by commas.
 *
 * @command putBackContainersContents
 * @text Put Back Container(s) Contents.
 * @desc Puts back all the container(s) contents taken with
 * 'takeAllContainersContents' plugin command.
 *
 * @command callItemScene
 * @text Call the Item Scene.
 * @desc Use this command if you want to force the player into the
 * party inventory to drop items.
 *
 */

  /*~struct~storageContainers:
    @param Container Name
    @desc Choose a suitable name for this container. (viewable to player in game) Colour text codes allowed.
    @default Container

    @param Container Icon
    @desc Choose the icon you want to use for this container. (viewable to player in game)
    @default 210

    @param Max Storage
    @desc Choose this containers initial max amount of items that can be stored. 0 = infinite(∞).
    @type number
    @default 40

    @param Items
    @desc Choose this containers initial item contents if desired.
    @type struct<items>[]

    @param Weapons
    @desc Choose this containers initial weapon contents if desired.
    @type struct<weapons>[]

    @param Armors
    @desc Choose this containers initial armor contents if desired.
    @type struct<armors>[]

    @param Loot Container
    @desc Set this to a loot container? Loot containers can't take items from the player. (hides max weight)
    @type boolean
    @on YES
    @off NO
    @default false
 */

  /*~struct~items:
    @param Item Id
    @desc Choose the item for the containers initial contents.
    @type item

    @param Amount
    @desc How many of the item(s) should start in the container?
    @type number
    @default 1
 */

  /*~struct~weapons:
    @param Weapon Id
    @desc Choose the weapon for the containers initial contents.
    @type weapon

    @param Amount
    @desc How many of the weapon(s) should start in the container?
    @type number
    @default 1
 */

  /*~struct~armors:
    @param Armor Id
    @desc Choose the armor for the containers initial contents.
    @type armor

    @param Amount
    @desc How many of the armor(s) should start in the container?
    @type number
    @default 1
 */

 //-----------------------------------------------------------------------------
 // *Register Plugin Commands
 //-----------------------------------------------------------------------------

PluginManager.registerCommand('DM_LimitedInventory', 'changePartyMaxWeight' , args => {
  const arg0 = Number(args.amount);
  $gameContainers.changeInventoryMaxWeight(arg0);
});

PluginManager.registerCommand('DM_LimitedInventory', 'openContainer' , args => {
  const arg0 = Number(args.containerId);
  $gameContainers.openContainer(arg0);
});

PluginManager.registerCommand('DM_LimitedInventory', 'createContainer', args => {
  const arg0 = args.name;
  const arg1 = Number(args.maxStorage);
  const arg2 = Number(args.storageIconId);
  const arg3 = eval(args.containerLoot);
  const arg4 = Number(args.variableId);
  $gameContainers.createContainer(arg0,arg1,arg2,arg3,arg4);
});

PluginManager.registerCommand('DM_LimitedInventory', 'setInventoryMechanics', args => {
  const arg0 = args.inventoryMechanics;
  $gameContainers.setInventoryMechanics(arg0);
});

PluginManager.registerCommand('DM_LimitedInventory', 'changeContainerMaxWeight' , args => {
  const arg0 = Number(args.containerId);
  const arg1 = Number(args.amount);
  $gameContainers.changeStorageContainerMaxWeight(arg0,arg1)
});

PluginManager.registerCommand('DM_LimitedInventory', 'addItemToContainer' , args => {
  const arg0 = Number(args.containerId);
  const arg1 = Number(args.itemId);
  const arg2 = Number(args.amount);
  $gameContainers.addItemToContainer(arg0,arg1,arg2);
});

PluginManager.registerCommand('DM_LimitedInventory', 'addWeaponToContainer' , args => {
  const arg0 = Number(args.containerId);
  const arg1 = Number(args.weaponId);
  const arg2 = Number(args.amount);
  $gameContainers.addWeaponToContainer(arg0,arg1,arg2);
});

PluginManager.registerCommand('DM_LimitedInventory', 'addArmorToContainer' , args => {
  const arg0 = Number(args.containerId);
  const arg1 = Number(args.armorId);
  const arg2 = Number(args.amount);
  $gameContainers.addArmorToContainer(arg0,arg1,arg2);
});

PluginManager.registerCommand('DM_LimitedInventory', 'takeItemFromContainer' , args => {
  const arg0 = Number(args.containerId);
  const arg1 = Number(args.itemId);
  const arg2 = Number(args.amount);
  $gameContainers.addItemToContainer(arg0,arg1,-arg2);
});

PluginManager.registerCommand('DM_LimitedInventory', 'takeWeaponFromContainer' , args => {
  const arg0 = Number(args.containerId);
  const arg1 = Number(args.weaponId);
  const arg2 = Number(args.amount);
  $gameContainers.addItemToContainer(arg0,arg1,-arg2);
});

PluginManager.registerCommand('DM_LimitedInventory', 'takeArmorFromContainer' , args => {
  const arg0 = Number(args.containerId);
  const arg1 = Number(args.armorId);
  const arg2 = Number(args.amount);
  $gameContainers.addItemToContainer(arg0,arg1,-arg2);
});

PluginManager.registerCommand('DM_LimitedInventory', 'takeAllContainersContents' , args => {
  const arg0 = args.containerIds;
  $gameContainers.takeAllContainersContents(arg0);
});

PluginManager.registerCommand('DM_LimitedInventory', 'putBackContainersContents' , args => {
  $gameContainers.putBackContainersContents();
});

PluginManager.registerCommand('DM_LimitedInventory', 'callItemScene' , args => {
  $gameContainers.callItemScene();
});

//-----------------------------------------------------------------------------
// Parameters
//-----------------------------------------------------------------------------

Dungeonmind.LI.parameters = PluginManager.parameters('DM_LimitedInventory');

Dungeonmind.LI.itemAmountText = Dungeonmind.LI.parameters['Item Amount Text'];
Dungeonmind.LI.itemWeightWindow = eval(String(Dungeonmind.LI.parameters['Item Action Weight Window'] || true));
Dungeonmind.LI.itemWeightIcon = parseInt(Dungeonmind.LI.parameters['Item Weight Icon']);
Dungeonmind.LI.inventoryTitle = Dungeonmind.LI.parameters['Inventory Title Text'];
Dungeonmind.LI.itemWeightText = Dungeonmind.LI.parameters['Item Weight Text'];
Dungeonmind.LI.itemWeightWindowWidth = Number(Dungeonmind.LI.parameters['Item Weight Window Width']);
Dungeonmind.LI.itemWeightWindowText_X_Offset = Number(Dungeonmind.LI.parameters['Item Weight Text X Offset']);
Dungeonmind.LI.itemWeightWindowNumbers_X_Offset = Number(Dungeonmind.LI.parameters['Item Weight Numbers X Offset']);
Dungeonmind.LI.itemDefaultQuantity = Number(Dungeonmind.LI.parameters['Item Default Quantity']);
Dungeonmind.LI.inventoryIcon = parseInt(Dungeonmind.LI.parameters['Inventory Icon']);
Dungeonmind.LI.startingInventoryMaxLimit = parseInt(Dungeonmind.LI.parameters['Starting Inventory Max Weight']);
Dungeonmind.LI.itemSe = Dungeonmind.LI.parameters['Item SE'];
Dungeonmind.LI.weaponSe = Dungeonmind.LI.parameters['Weapon SE'];
Dungeonmind.LI.armorSe = Dungeonmind.LI.parameters['Armor SE'];
Dungeonmind.LI.itemMaxDefault = Number(Dungeonmind.LI.parameters['Default Item Max']);
Dungeonmind.LI.itemCountSymbolText = Dungeonmind.LI.parameters['Item Count Symbol Text'];
Dungeonmind.LI.infiniteSymbolText = Dungeonmind.LI.parameters['Infinite Symbol Text'] || '∞';
Dungeonmind.LI.maxColms = Number(Dungeonmind.LI.parameters['Item List Columns']);
Dungeonmind.LI.inventoryType = Dungeonmind.LI.parameters['Inventory Type'] || 'Item Weight';
Dungeonmind.LI.itemLayout = Dungeonmind.LI.parameters['Item Layout'] || 'RPG Maker Default';
Dungeonmind.LI.inventoryMechanics = Dungeonmind.LI.parameters['Inventory Mechanics'] || 'Restrictive';
//*~ Terms ~*
Dungeonmind.LI.surpassInvMaxWeightText = Dungeonmind.LI.parameters['Surpass Max Inv. Weight'] || "\\c[2]The party is currently over the maximum weight limit; \nplease drop some items!\\c[0]";
Dungeonmind.LI.surpassInvMaxWeightTextInContainer = Dungeonmind.LI.parameters['Surpass Max Inv. Weight 2'] || "\\c[2]The party is currently over the maximum weight limit; \nplease deposit/drop some items first!\\c[0]";
Dungeonmind.LI.surpassContainerMaxWeightText = Dungeonmind.LI.parameters['Surpass Max Cont. Weight'] || "\\c[2]There is not enough available space in this container!\nTry removing some items first.\\c[0]";
Dungeonmind.LI.itemCannotBeDroppedText = Dungeonmind.LI.parameters['Item Cannot Be Dropped'] || 'This item cannot be dropped.';
Dungeonmind.LI.itemcannotBeDepositedText = Dungeonmind.LI.parameters['Item Cannot Be Deposited'] || "This item cannot be deposited.";
Dungeonmind.LI.containerCantTakeAnyItemsText = Dungeonmind.LI.parameters['Container Items Disallowed'];
Dungeonmind.LI.itemActionWindowText = Dungeonmind.LI.parameters['Item Action Window Text'] || 'Select an action.';
Dungeonmind.LI.containerCategoryActivatedText = Dungeonmind.LI.parameters['Container Cat. Text'] || "Do you want to withdraw or deposit?";
Dungeonmind.LI.onActionDropText = Dungeonmind.LI.parameters['On Action Drop Text'] || "How many do you want to drop? Press & hold SHIFT to\nincrease/decrease by x10.";
Dungeonmind.LI.onActionItemDepositText = Dungeonmind.LI.parameters['On Action Item Deposit'] || "Deposit how much? Press & hold SHIFT to increase/decrease\nby x10.";
Dungeonmind.LI.onActionItemWithdrawText = Dungeonmind.LI.parameters['On Action Item Withdraw'] || "Withdraw how much? Press & hold SHIFT to increase/decrease\nby x10.";
Dungeonmind.LI.noItemToDepositText = Dungeonmind.LI.parameters['No Item To Deposit'] || "There is no item to deposit.";
Dungeonmind.LI.noItemToWithdrawText = Dungeonmind.LI.parameters['No Item To Withdraw'] || "There is no item to withdraw.";

//-----------------------------------------------------------------------------
// Game_Party
//
// The game object class for the party. Information such as gold and items is
// included.

Dungeonmind.LI.ALIAS_GameParty_gainItem = Game_Party.prototype.gainItem;

Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    Dungeonmind.LI.ALIAS_GameParty_gainItem.call(this, item, amount, includeEquip);
    return $gameContainers._inventoryCurrentWeight+=amount;
};

Game_Party.prototype.maxItems = function(/*item*/) {
    return Dungeonmind.LI.itemMaxDefault;
};

//-----------------------------------------------------------------------------
// Window_ItemDMCategory
//
// The window for selecting a category of items on the item and shop screens.

function Window_ItemDMCategory() {
    this.initialize(...arguments);
}

Window_ItemDMCategory.prototype = Object.create(Window_HorzCommand.prototype);
Window_ItemDMCategory.prototype.constructor = Window_ItemDMCategory;

Window_ItemDMCategory.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_ItemDMCategory.prototype.maxCols = function() {
    return 4;
};

Window_ItemDMCategory.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
    if (this._containerWindow) {
        this._containerWindow.setCategory(this.getCategorySymbol());
    }
    if (this._buyWindow) {
        this._buyWindow.setCategory(this.getCategorySymbol());
    }
};

Window_ItemDMCategory.prototype.makeCommandList = function() {
    if (this.needsCommand("item")) {
        this.addCommand(TextManager.item, "item");
    }
    if (this.needsCommand("weapon")) {
        this.addCommand(TextManager.weapon, "weapon");
    }
    if (this.needsCommand("armor")) {
        this.addCommand(TextManager.armor, "armor");
    }
    if (this.needsCommand("keyItem")) {
        this.addCommand(TextManager.keyItem, "keyItem");
    }
};

Window_ItemDMCategory.prototype.needsCommand = function(name) {
    const table = ["item", "weapon", "armor", "keyItem"];
    const index = table.indexOf(name);
    if (index >= 0) {
        return $dataSystem.itemCategories[index];
    }
    return true;
};

Window_ItemDMCategory.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};

Window_ItemDMCategory.prototype.needsSelection = function() {
    return this.maxItems() >= 2;
};

Window_ItemDMCategory.prototype.getCategorySymbol = function() {
    if($plugins.find(plugin => plugin.name == "DM_ItemCategories")?.status) {
        return $gameCategories._symbols[this.index()];
    } else {
        return this.currentSymbol();
    }
};

Window_ItemDMCategory.prototype.setContainerWindow = function(containerWindow) {
    this._containerWindow = containerWindow;
};

Window_ItemDMCategory.prototype.setBuyWindow = function(buyWindow) {
    this._buyWindow = buyWindow;
};

//-----------------------------------------------------------------------------
// Game_Containers
//
// The game object class for handling party inventory, containers, and there contents.
 
function Game_Containers() {
    this.initialize(...arguments);
}

Game_Containers.prototype.initialize = function() {
    this._inventoryCurrentWeight = 0;
    this._inventoryMaxWeight = this.setInitialMaxWeight();
    this._containers = [];
    this.tempId = 0;
    this.tempItem = {};
    this.currentItemMax = 0;
    this.currentMaxAmount = 0;
    this.currentUsedSpace = 0;
    this._newGameStart = false;
    this._weightCount = 0;
    this._startItems = [];
    this._independentId = 10000;
    this._paramContainers = this._paramContainers || this.createParamContainers();
    this._itemDefaultQuantity = Dungeonmind.LI.itemDefaultQuantity;
    this.initInventoryMechanics();
    this.initHelpWarningTerms();
};

Game_Containers.prototype.createParamContainers = function() {
    Dungeonmind.LI.ParamContainers = JSON.parse(Dungeonmind.LI.parameters['Storage Containers'] || '[""]');
    for(let i = 0; i < Dungeonmind.LI.ParamContainers.length; i++) {
        Dungeonmind.LI.ParamContainers[i] = JSON.parse(Dungeonmind.LI.ParamContainers[i]); //Parameter Parsing
        let containerLoot = JSON.parse(Dungeonmind.LI.ParamContainers[i]['Loot Container']);
        let containerName = Dungeonmind.LI.ParamContainers[i]['Container Name'];
        let containerIcon = Dungeonmind.LI.ParamContainers[i]['Container Icon'];
        let containerMaxStorage = Dungeonmind.LI.ParamContainers[i]['Max Storage'];
        if(Dungeonmind.LI.ParamContainers[i]['Items']) { //*Checks to see if any starting items
            this._containerItems = JSON.parse(Dungeonmind.LI.ParamContainers[i]['Items']);
        }
        if(Dungeonmind.LI.ParamContainers[i]['Weapons']) { //*Checks to see if any starting weapons
            this._containerWeapons = JSON.parse(Dungeonmind.LI.ParamContainers[i]['Weapons']);
        }
        if(Dungeonmind.LI.ParamContainers[i]['Armors']) { //*Checks to see if any starting armors
            this._containerArmors = JSON.parse(Dungeonmind.LI.ParamContainers[i]['Armors']);
        }
        this.createContainer(containerName, parseInt(containerMaxStorage), parseInt(containerIcon), containerLoot);
        this._containers[i].startItems = [];
        this._containers[i].startWeapons = [];
        this._containers[i].startArmors = [];
        if(this._containerItems) {
            for(let i2 = 0; i2 < this._containerItems.length; i2++) {
                this._containers[i].startItems.push(JSON.parse(this._containerItems[i2]));
            }
            this._containerItems = undefined;
        }
        if(this._containerWeapons) {
            for(let i2 = 0; i2 < this._containerWeapons.length; i2++) {
                this._containers[i].startWeapons.push(JSON.parse(this._containerWeapons[i2]));
            }
            this._containerWeapons = undefined;
        }
        if(this._containerArmors) {
            for(let i2 = 0; i2 < this._containerArmors.length; i2++) {
                this._containers[i].startArmors.push(JSON.parse(this._containerArmors[i2]));
            }
            this._containerArmors = undefined;
        }
    }
    this.initializeContainerItems();
    this.initializeContainerWeapons();
    this.initializeContainerArmors();
};

Game_Containers.prototype.initializeContainerItems = function() {
    for(let i = 0; i < this._containers.length; i++) {
        for(let i2 = 0; i2 < this._containers[i].startItems.length; i2++) {
            let containerId = i;
            let itemId = this._containers[i].startItems[i2]["Item Id"];
            let amount = this._containers[i].startItems[i2]["Amount"];
            let name = $dataItems[itemId].name;
            let iconIndex = $dataItems[itemId].iconIndex;
            let etypeId = $dataItems[itemId].etypeId;
            let description = $dataItems[itemId].description;
            let itemWeight = $dataItems[itemId].meta.itemWeight;
            let itypeId = $dataItems[itemId].itypeId;
            let meta = $dataItems[itemId].meta;
            let categories = this.getCategories($dataItems[itemId]);
            if(this.dmIndependentItemsPluginCheck() && $dataItems[itemId].meta.independentItem) {
                while(amount > 0) {
                    newItem = {...$dataItems[itemId]};
                    this._independentId++;
                    itemId = this._independentId;
                    newItem.id = this._independentId;
                    $dataItems[itemId] = newItem;
                    this.depositItem(containerId, Number(itemId), 1, name, Number(iconIndex), etypeId, description, itemWeight, itypeId, categories, meta);
                    amount--;
                }
            } else {
                this.depositItem(containerId, Number(itemId), Number(amount), name, Number(iconIndex), etypeId, description, itemWeight, itypeId, categories, meta);
            }
        }
    }
};

Game_Containers.prototype.initializeContainerWeapons = function() {
    for(let i = 0; i < this._containers.length; i++) {
        for(let i2 = 0; i2 < this._containers[i].startWeapons.length; i2++) {
            let containerId = i;
            let itemId = this._containers[i].startWeapons[i2]["Weapon Id"];
            let amount = this._containers[i].startWeapons[i2]["Amount"];
            let name = $dataWeapons[itemId].name;
            let iconIndex = $dataWeapons[itemId].iconIndex;
            let etypeId = $dataWeapons[itemId].etypeId;
            let description = $dataWeapons[itemId].description;
            let itemWeight = $dataWeapons[itemId].meta.itemWeight;
            let itypeId = $dataWeapons[itemId].itypeId;
            let meta = $dataWeapons[itemId].meta;
            let categories = this.getCategories($dataWeapons[itemId]);
            if(this.dmIndependentItemsPluginCheck() && $dataWeapons[itemId].meta.independentItem) {
                while(amount > 0) {
                    newItem = {...$dataWeapons[itemId]};
                    this._independentId++;
                    itemId = this._independentId;
                    newItem.id = this._independentId;
                    $dataWeapons[itemId] = newItem;
                    this.depositItem(containerId, Number(itemId), 1, name, Number(iconIndex), etypeId, description, itemWeight, itypeId, categories, meta);
                    amount--;
                }
            } else {
                this.depositItem(containerId, Number(itemId), Number(amount), name, Number(iconIndex), etypeId, description, itemWeight, itypeId, categories, meta);
            }
        }
    }
};

Game_Containers.prototype.initializeContainerArmors = function() {
    for(let i = 0; i < this._containers.length; i++) {
        for(let i2 = 0; i2 < this._containers[i].startArmors.length; i2++) {
            let containerId = i;
            let itemId = this._containers[i].startArmors[i2]["Armor Id"];
            let amount = this._containers[i].startArmors[i2]["Amount"];
            let name = $dataArmors[itemId].name;
            let iconIndex = $dataArmors[itemId].iconIndex;
            let etypeId = $dataArmors[itemId].etypeId;
            let description = $dataArmors[itemId].description;
            let itemWeight = $dataArmors[itemId].meta.itemWeight;
            let itypeId = $dataArmors[itemId].itypeId;
            let meta = $dataArmors[itemId].meta; 
            let categories = this.getCategories($dataArmors[itemId]);
            if(this.dmIndependentItemsPluginCheck() && $dataArmors[itemId].meta.independentItem) {
                while(amount > 0) {
                    newItem = {...$dataArmors[itemId]};
                    this._independentId++;
                    itemId = this._independentId;
                    newItem.id = this._independentId;
                    $dataArmors[itemId] = newItem;
                    this.depositItem(containerId, Number(itemId), 1, name, Number(iconIndex), etypeId, description, itemWeight, itypeId, categories, meta);
                    amount--;
                }
            } else {
                this.depositItem(containerId, Number(itemId), Number(amount), name, Number(iconIndex), etypeId, description, itemWeight, itypeId, categories, meta);
            }
        }
    }
};

Game_Containers.prototype.initHelpWarningTerms = function() {
	this._surpassInvMaxWeightText = JSON.parse(Dungeonmind.LI.surpassInvMaxWeightText);
	this._surpassInvMaxWeightTextInContainer = JSON.parse(Dungeonmind.LI.surpassInvMaxWeightTextInContainer);
	this._surpassContainerMaxWeightText = JSON.parse(Dungeonmind.LI.surpassContainerMaxWeightText);
	this._itemCannotBeDroppedText = JSON.parse(Dungeonmind.LI.itemCannotBeDroppedText);
	this._itemCannotBeDepositedText = JSON.parse(Dungeonmind.LI.itemcannotBeDepositedText);
	this._containerCantTakeAnyItemsText = JSON.parse(Dungeonmind.LI.containerCantTakeAnyItemsText);
	this._itemActionWindowText = JSON.parse(Dungeonmind.LI.itemActionWindowText);
	this._containerCategoryActivatedText = JSON.parse(Dungeonmind.LI.containerCategoryActivatedText);
	this._onActionDropText = JSON.parse(Dungeonmind.LI.onActionDropText);
	this._onActionItemDepositText = JSON.parse(Dungeonmind.LI.onActionItemDepositText);
	this._onActionItemWithdrawText = JSON.parse(Dungeonmind.LI.onActionItemWithdrawText);
	this._noItemToDepositText = JSON.parse(Dungeonmind.LI.noItemToDepositText);
	this._noItemToWithdrawText = JSON.parse(Dungeonmind.LI.noItemToWithdrawText);
};

Game_Containers.prototype.setInitialMaxWeight = function() {
    return Dungeonmind.LI.startingInventoryMaxLimit;
};

Game_Containers.prototype.changeInventoryMaxWeight = function(value) {
    return this._inventoryMaxWeight+=value;
};

Game_Containers.prototype.changeStorageContainerMaxWeight = function(id, amount) {
    return this._containers[id-1].maxStorage+=amount;
};

Game_Containers.prototype.changeInventoryCount = function(amount) {
    return this._inventoryCurrentWeight+=amount;
};

Game_Containers.prototype.getCurrentPartyInventoryWeight = function() {
    if(Dungeonmind.LI.inventoryType === 'Item Weight') {
        const items = $gameParty.allItems();
        this._weightCount = 0;
        for(let i = 0; i < items.length; i++) {
            if(items[i].meta.itemWeight === undefined) {
                this._weightCount += this.getItemDataAmount(items[i]);
            } else {
                let itemWeight = Number(items[i].meta.itemWeight);
                this._weightCount += itemWeight * this.getItemDataAmount(items[i]);
            }
        }
        this._weightCount = parseFloat(this._weightCount.toFixed(4));
        return this._weightCount;
    } else if (Dungeonmind.LI.inventoryType === 'Slot Based') {
        return this.getCurrentPartySlotsWeight();
    }
};

Game_Containers.prototype.getCurrentPartySlotsWeight = function() {
    const items = $gameParty.allItems();
    this._weightCount = 0;
    for(let i = 0; i < items.length; i++) {
        if(items[i].meta.itemWeight === undefined) {
            this._weightCount += 1;
        } else {
            let itemWeight = Number(items[i].meta.itemWeight);
            this._weightCount += itemWeight; //*Edit
        }
    }
    this._weightCount = parseFloat(this._weightCount.toFixed(4));
    return this._weightCount;
};

Game_Containers.prototype.getItemDataAmount = function(item) {
    let items = $gameParty._items;
    if(item.etypeId === 1) {
        items = $gameParty._weapons;
    } else if(item.etypeId > 1) {
        items = $gameParty._armors;
    }
    return items[item.id];
};

Game_Containers.prototype.getCategories = function(item) {
    if(item && item.categories) {
        item.categories = item.note.replaceAll('<Categories>','');
        item.categories = item.categories.replaceAll('</Categories>','');
        item.categories = item.categories.replaceAll('\n',',');
        item.categories = item.categories.split(',');
        item.categories.filter((str) => str !== '');
        this._symbols = [];
        let newSymbol = "";
        for(let i = 0; i < item.categories.length; i++) {
            newSymbol = this.convertOldSymbol(item.categories[i])
            this._symbols.push(newSymbol);
        }
        return this._symbols;
    } else {
        return;
    }
};

Game_Containers.prototype.convertOldSymbol = function(symbol) {
    if(symbol === "weapon") {
        symbol = "weapons";
    }
    if(symbol === "armor") {
        symbol = "armors";
    }
    if(symbol === "item") {
        symbol = "items";
    }
    if(symbol === "keyItem") {
        symbol = "keyItems";
    }
    return symbol;
};

Game_Containers.prototype.getCurrentPartyInventoryMaxWeight = function() {
    return this._inventoryMaxWeight + this.stateWeightBonuses() + this.itemWeightBonuses() + this.actorWeightBonuses() + this.equipWeightBonuses();
};

Game_Containers.prototype.itemArray = function() {
    return this.itemArray;
};

Game_Containers.prototype.currentItem = function(item) {
    return this._tempItem = item;
};

Game_Containers.prototype.tempId = function() {
    return this.tempId;
};

Game_Containers.prototype.tempItemName = function() {
    return this.tempItemName;
};

Game_Containers.prototype._containers = function() {
    return this._containers;
};

Game_Containers.prototype.stateWeightBonuses = function() {
    weight = 0;
    maxWeight = 0;
    for(let i = 0; i < $dataStates.length; i++) {
        if($dataStates[i] !== null && $dataStates[i].meta.maxWeight) {
            maxWeight = parseFloat($dataStates[i].meta.maxWeight);
            maxWeight = maxWeight.toFixed(4);
            id = $dataStates[i].id;
            if(this.actorHasState(id) !== 0) {
                weight+=maxWeight*this.actorHasState(id);
            }
        }
    }
    return weight;
};

Game_Containers.prototype.actorHasState = function(stateId) {
    num = 0;
    for(let i = 0; i < $gameActors._data.length; i++) {
        if($gameActors._data[i] !== undefined && $gameActors._data[i] != null) {
            for(let i2 = 0; i2 < $gameActors._data[i]._states.length; i2++) {
                if($gameActors._data[i]._states[i2] === stateId) {
                    if(this.checkActorInReserve($gameActors._data[i].actorId())) {
                        num+=1;
                    }
                }
            }
        }
    }
    return num;
};

Game_Containers.prototype.checkActorInReserve = function(actorId) {
    members = $gameParty.battleMembers();
    for(let i = 0; i < members.length; i++) {
        if(members[i]._actorId === actorId) {
            return true;
        }
    }
    return false;
};

Game_Containers.prototype.itemWeightBonuses = function() {
    weight = 0;
    maxWeight = 0;
    for(let i = 0; i < $gameParty.allItems().length; i++) {
        if($gameParty.allItems()[i].meta.maxWeight) {
            id = $gameParty.allItems()[i].id;
            if($gameParty.allItems()[i].etypeId === undefined) {
                amount = $gameParty._items[id];
            }
            if($gameParty.allItems()[i].etypeId === 1) {
                amount = $gameParty._weapons[id];
            }
            if($gameParty.allItems()[i].etypeId > 1) {
                amount = $gameParty._armors[id];
            }
            maxWeight = parseFloat($gameParty.allItems()[i].meta.maxWeight);
            maxWeight = maxWeight.toFixed(4);
            weight+=maxWeight*amount;
            
        }
    }
    return weight;
};

Game_Containers.prototype.actorWeightBonuses = function() {
    weight = 0;
    maxWeight = 0;
    for(let i = 0; i < $gameParty.members().length; i++) {
        if(this.checkActorInReserve($gameParty.members()[i]._actorId)) {
            if($dataActors[$gameParty.members()[i]._actorId].meta.maxWeight) {
                maxWeight = $dataActors[$gameParty.members()[i]._actorId].meta.maxWeight;
                maxWeight = parseFloat(maxWeight);
                //maxWeight = maxWeight.toFixed(4);
                weight+=maxWeight;
            }
        }
    }
    return weight;
};

Game_Containers.prototype.equipWeightBonuses = function() {
    weight = 0;
    maxWeight = 0;
    for(let i = 0; i < $gameParty.battleMembers().length; i++) {
        for(let i2 = 0; i2 < $gameParty.battleMembers()[i]._equips.length; i2++) {
            if($gameParty.battleMembers()[i]._equips[i2]._dataClass === 'weapon') {
                id = $gameParty.battleMembers()[i]._equips[i2]._itemId
                if($dataWeapons[id] !== null && $dataWeapons[id].meta.equipWeight) {
                    maxWeight = parseFloat($dataWeapons[id].meta.equipWeight);
                    weight+=maxWeight;
                }
            }
            if($gameParty.battleMembers()[i]._equips[i2]._dataClass === 'armor') {
                id = $gameParty.battleMembers()[i]._equips[i2]._itemId
                if($dataArmors[id] !== null && $dataArmors[id].meta.equipWeight) {
                    maxWeight = parseFloat($dataArmors[id].meta.equipWeight);
                    weight+=maxWeight;
                }
            }
        }
    }
    return weight;
};

Game_Containers.prototype.createContainer = function(name, maxStorage, storageIconId, containerLoot, variableId) {
    var itemArray = [];
    maxStorage === 0 ? maxStorage = Infinity : maxStorage = maxStorage; //*Infinity Support
    this.container = {name, maxStorage, itemArray, storageIconId, containerLoot};
    this._containers.push(this.container);
    if(variableId) { //*~
    	let id = this._containers.length;
    	console.log(id);
    	$gameVariables.setValue(variableId, id)
    }
};

Game_Containers.prototype.openContainer = function(id) {
    this.tempId = id;
    if(this._containers[id-1].maxStorage === null) {this._containers[id-1].maxStorage = Infinity}; //*Infiity changing to null fix
    this.currentMaxAmount = this._containers[id-1].maxStorage;
    SceneManager.push(Scene_Container);
};

Game_Containers.prototype.setItemName = function(item) {
    this.tempItemName = item.name;
    this.tempItem = item;
};

Game_Containers.prototype.depositItem = function(containerId ,itemId, amount, name, iconIndex, etypeId, description, itemWeight, itypeId, categories, meta) {
    categories = this.changeDefaultCategories(categories);
    for(let i = 0; i < this._containers[containerId].itemArray.length; i++) {
        if(this._containers[containerId].itemArray[i].itemId === itemId && this._containers[containerId].itemArray[i].etypeId === etypeId) {
            return this._containers[containerId].itemArray[i].itemAmount+=amount;
        }
    }
    if(etypeId === 1) {
		containerItem = {...$dataWeapons[itemId], itemId : itemId, itemAmount : amount, name : name, iconIndex : iconIndex, etypeId : etypeId, description : description, itemWeight : itemWeight, itypeId : itypeId, categories : categories, meta : meta};
    } else if(etypeId > 1) {
    	containerItem = {...$dataArmors[itemId], itemId : itemId, itemAmount : amount, name : name, iconIndex : iconIndex, etypeId : etypeId, description : description, itemWeight : itemWeight, itypeId : itypeId, categories : categories, meta : meta};
    } else if(etypeId === undefined) {
		containerItem = {...$dataItems[itemId], itemId : itemId, itemAmount : amount, name : name, iconIndex : iconIndex, etypeId : etypeId, description : description, itemWeight : itemWeight, itypeId : itypeId, categories : categories, meta : meta};
    }
    return this._containers[containerId].itemArray.push(containerItem);
};

Game_Containers.prototype.changeDefaultCategories = function(categories) {
	if(categories) {
		for(let i = 0; i < categories.length; i++) {
			if(categories[i] === "weapon") {
        		categories[i] = "weapons";
    		}
    		if(categories[i] === "armor") {
        		categories[i] = "armors";
    		}
    		if(categories[i] === "item") {
        		categories[i] = "items";
    		}
    		if(categories[i] === "keyItem") {
        		categories[i] = "keyItems";
    		}
		}
		return categories;
	}
};

Game_Containers.prototype.getCurrentContainerMaxSpace = function() {
    return this.currentMaxAmount;
};

Game_Containers.prototype.getCurrentUsedContainerSpace = function() {
    if(Dungeonmind.LI.inventoryType === 'Item Weight') {
        this._count = 0;
        let num = 0;
        for(let i = 0; i < $gameContainers._containers[this.tempId-1].itemArray.length; i++) {
            if($gameContainers._containers[this.tempId-1].itemArray[i].itemWeight === undefined) {
                this._count += $gameContainers._containers[this.tempId-1].itemArray[i].itemAmount;
            } else {
                this._count += $gameContainers._containers[this.tempId-1].itemArray[i].itemWeight * $gameContainers._containers[this.tempId-1].itemArray[i].itemAmount;
            }
        }
        this._count = parseFloat(this._count.toFixed(4));
        return this._count;
    } else if(Dungeonmind.LI.inventoryType === 'Slot Based') {
        return this.getCurrentUsedSlotContainerSpace();
    }
};

Game_Containers.prototype.getCurrentUsedSlotContainerSpace = function() {
    this._count = 0;
    let num = 0;
    for(let i = 0; i < $gameContainers._containers[this.tempId-1].itemArray.length; i++) {
        if($gameContainers._containers[this.tempId-1].itemArray[i].itemWeight === undefined) {
            this._count += 1;
        } else {
            this._count += Number($gameContainers._containers[this.tempId-1].itemArray[i].itemWeight);
        }
    }
    this._count = parseFloat(this._count.toFixed(4));
    return this._count;
};

Game_Containers.prototype.withdrawItem = function(itemId, amount, etypeId) {
    this.changeInventoryCount(amount);
    let items = $gameParty.items();
    let itemsData = $gameParty._items;    
    if(etypeId === 1) {
        items = $gameParty.weapons();
        itemsData = $gameParty._weapons;
    } else if(etypeId > 1) {
        items = $gameParty.armors();
        itemsData = $gameParty._armors;
    }
    for(let i = 0; i < items.length; i++) {
        if(itemsData[itemId]) {
            return itemsData[itemId]+=amount;
        }
    }
    return itemsData[itemId] = amount;
};

Game_Containers.prototype.takeContainerItems = function(itemId, amount, etypeId) {
    for(let i = 0; i < this._containers[this.tempId-1].itemArray.length; i++) {
        if(this._containers[this.tempId-1].itemArray[i].itemId === itemId && this._containers[this.tempId-1].itemArray[i].etypeId === etypeId) {
            this._containers[this.tempId-1].itemArray[i].itemAmount-=amount;
            if(this._containers[this.tempId-1].itemArray[i].itemAmount === 0) {
               this.eraseItemEntry();
            }
        }
    }
};

Game_Containers.prototype.eraseItemEntry = function() {
    for (var i = 0; i < $gameContainers._containers[$gameContainers.tempId-1].itemArray.length; i++)
        if ($gameContainers._containers[$gameContainers.tempId-1].itemArray[i].itemAmount === 0) {
            $gameContainers._containers[$gameContainers.tempId-1].itemArray.splice(i,1);
        break;
    }
};

Game_Containers.prototype.checkAvailableSpace = function(amount) { // For Containers
    if(Dungeonmind.LI.inventoryType === 'Item Weight') {
        let remainder = this.getCurrentContainerMaxSpace() - this.getCurrentUsedContainerSpace();
        let item = SceneManager._scene._itemWindow.item();
        if(item.meta.itemWeight) {
            amount = amount*Number(item.meta.itemWeight);
        }
        if(amount > remainder) {
            return false;
        } else {
            return true;
        }
    } else if(Dungeonmind.LI.inventoryType === 'Slot Based') {
        return this.checkAvailableSlotSpace(amount);
    }
};

Game_Containers.prototype.checkAvailableSlotSpace = function(amount) { // For Slot Containers
    let remainder = this.getCurrentContainerMaxSpace() - this.getCurrentUsedContainerSpace();
    let item = SceneManager._scene._itemWindow.item();
    let items = this._containers[this.tempId-1].itemArray;
    for(let i = 0; i < items.length; i++) {
        if(items[i].etypeId === item.etypeId && items[i].itemId === item.id) {
            if(items[i].itemAmount + amount < Dungeonmind.LI.itemMaxDefault) {
                return true;
            } else {
                return false;
            }
        }
    }
    itemWeight = Number(item.meta.itemWeight);
    if(item.meta.itemWeight === undefined) {
        itemWeight = 1;
    }
    if(itemWeight <= remainder) {
        return true;
    } else {
        return false;
    }
};

Game_Containers.prototype.checkAvailableInventorySpace = function(amount) { // For Inventory
    if(Dungeonmind.LI.inventoryType === 'Item Weight') {
        let remainder = this.getCurrentPartyInventoryMaxWeight() - this.getCurrentPartyInventoryWeight();
        let item = SceneManager._scene._containerWindow.item();
        if(item.itemWeight) {
            amount = amount*Number(item.itemWeight);
        }
        if(amount > remainder) {
            return false;
        } else {
            return true;
        }
    } else if(Dungeonmind.LI.inventoryType === 'Slot Based') {
        return this.checkAvailableInventorySlotSpace(amount);        
    }
};

Game_Containers.prototype.checkAvailableInventorySlotSpace = function(amount) { // For Slot Inventory
    let remainder = this.getCurrentPartyInventoryMaxWeight() - this.getCurrentPartyInventoryWeight();
    let item = SceneManager._scene._containerWindow.item();
    let items = $gameParty.allItems();
    for(let i = 0; i < items.length; i++) {
        if(items[i].etypeId === item.etypeId && items[i].id === item.itemId) {
            if(items[i].etypeId === 1) {
                if($gameParty._weapons[items[i].id] + amount < Dungeonmind.LI.itemMaxDefault) {
                    return true;
                } else {
                    return false;
                }
            } else if(items[i].etypeId > 1) {
                if($gameParty._armors[items[i].id] + amount < Dungeonmind.LI.itemMaxDefault) {
                    return true;
                } else {
                    return false;
                }
            } else if(items[i].etypeId === undefined) {
                if($gameParty._items[items[i].id] + amount < Dungeonmind.LI.itemMaxDefault) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
    itemWeight = Number(item.meta.itemWeight);
    if(item.meta.itemWeight === undefined) {
        itemWeight = 1;
    }
    if(itemWeight <= remainder) {
        return true;
    } else {
        return false;
    }
};

Game_Containers.prototype.checkItemWeight = function(item) {
    if(item.meta.itemWeight) {
        return Number(item.meta.itemWeight);
    } else {
        return 1;
    }
};

Game_Containers.prototype.checkItemWeightContainer = function(item) {
    if(item.itemWeight) {
        return Number(item.itemWeight);
    } else {
        return 1;
    }
};

// Added Script call for checking party space for items.

Game_Containers.prototype.checkPartyHaveSpaceForItem = function(itemId, amount) {
    if(Dungeonmind.LI.inventoryType === 'Item Weight') {
        let remainder = this.getCurrentPartyInventoryMaxWeight() - this.getCurrentPartyInventoryWeight();
        let item = $dataItems[itemId];
        if(item.meta.itemWeight) {
            amount = amount*Number(item.meta.itemWeight);
        }
        if(amount > remainder) {
            return false;
        } else {
            return true;
        }
    } else if(Dungeonmind.LI.inventoryType === 'Slot Based') {
        return this.checkPartyHaveSpaceForSlotItem(itemId, amount);
    }
};

Game_Containers.prototype.checkPartyHaveSpaceForSlotItem = function(itemId, amount) {
    let remainder = this.getCurrentPartyInventoryMaxWeight() - this.getCurrentPartyInventoryWeight();
    let item = $dataItems[itemId];
    let items = $gameParty.items();
    for(let i = 0; i < items.length; i++) {
        if(items[i].id === item.id) {
            if($gameParty._items[items[i].id] + amount < Dungeonmind.LI.itemMaxDefault) {
                return true;
            } else {
                return false;
            }
        }
    }
    itemWeight = Number(item.meta.itemWeight);
    if(item.meta.itemWeight === undefined) {
        itemWeight = 1;
    }
    if(itemWeight <= remainder) {
        return true;
    } else {
        return false;
    }
};

// For Weapons.

Game_Containers.prototype.checkPartyHaveSpaceForWeapon = function(weaponId, amount) {
    if(Dungeonmind.LI.inventoryType === 'Item Weight') {
        let remainder = this.getCurrentPartyInventoryMaxWeight() - this.getCurrentPartyInventoryWeight();
        let item = $dataWeapons[weaponId];
        if(item.meta.itemWeight) {
            amount = amount*Number(item.meta.itemWeight);
        }
        if(amount > remainder) {
            return false;
        } else {
            return true;
        }
    } else if(Dungeonmind.LI.inventoryType === 'Slot Based') {
        return this.checkPartyHaveSpaceForSlotWeapon(weaponId, amount);
    }
};

Game_Containers.prototype.checkPartyHaveSpaceForSlotWeapon = function(weaponId, amount) {
    let remainder = this.getCurrentPartyInventoryMaxWeight() - this.getCurrentPartyInventoryWeight();
    let item = $dataWeapons[weaponId];
    let items = $gameParty.weapons();
    for(let i = 0; i < items.length; i++) {
        if(items[i].id === item.id) {
            if($gameParty._weapons[items[i].id] + amount < Dungeonmind.LI.itemMaxDefault) {
                return true;
            } else {
                return false;
            }
        }
    }
    itemWeight = Number(item.meta.itemWeight);
    if(item.meta.itemWeight === undefined) {
        itemWeight = 1;
    }
    if(itemWeight <= remainder) {
        return true;
    } else {
        return false;
    }
};

// For Armors.

Game_Containers.prototype.checkPartyHaveSpaceForArmor = function(armorId, amount) {
    if(Dungeonmind.LI.inventoryType === 'Item Weight') {
        let remainder = this.getCurrentPartyInventoryMaxWeight() - this.getCurrentPartyInventoryWeight();
        let item = $dataArmors[armorId];
        if(item.meta.itemWeight) {
            amount = amount*Number(item.meta.itemWeight);
        }
        if(amount > remainder) {
            return false;
        } else {
            return true;
        }
    } else if(Dungeonmind.LI.inventoryType === 'Slot Based') {
        return this.checkPartyHaveSpaceForSlotArmor(armorId, amount);
    }
};

Game_Containers.prototype.checkPartyHaveSpaceForSlotArmor = function(armorId, amount) {
    let remainder = this.getCurrentPartyInventoryMaxWeight() - this.getCurrentPartyInventoryWeight();
    let item = $dataArmors[armorId];
    let items = $gameParty.armors();
    for(let i = 0; i < items.length; i++) {
        if(items[i].id === item.id) {
            if($gameParty._armors[items[i].id] + amount < Dungeonmind.LI.itemMaxDefault) {
                return true;
            } else {
                return false;
            }
        }
    }
    itemWeight = Number(item.meta.itemWeight);
    if(item.meta.itemWeight === undefined) {
        itemWeight = 1;
    }
    if(itemWeight <= remainder) {
        return true;
    } else {
        return false;
    }
};

Game_Containers.prototype.eraseEmptyItemEntry = function(containerId) {
    for (var i = 0; i < this._containers[containerId-1].itemArray.length; i++)
        if (this._containers[containerId-1].itemArray[i].itemAmount <= 0) {
            this._containers[containerId-1].itemArray.splice(i,1);
        break;
    }
};

Game_Containers.prototype.addItemToContainer = function(containerId, itemId, amount) { //*TO-DO -> Add support to negate deposits over the item limit.
  let name = $dataItems[itemId].name;
  let iconIndex = $dataItems[itemId].iconIndex;
  let etypeId = $dataItems[itemId].etypeId;
  let description = $dataItems[itemId].description;
  let itemWeight = $dataItems[itemId].meta.itemWeight;
  let itypeId = $dataItems[itemId].itypeId;
  let categories = $dataItems[itemId].categories;
  let meta = $dataItems[itemId].meta;
  this.depositItem(containerId-1, Number(itemId), Number(amount), name, Number(iconIndex), etypeId, description, itemWeight, itypeId, categories, meta);
  this.eraseEmptyItemEntry(containerId);
};

Game_Containers.prototype.addWeaponToContainer = function(containerId, itemId, amount) {
  let name = $dataWeapons[itemId].name;
  let iconIndex = $dataWeapons[itemId].iconIndex;
  let etypeId = $dataWeapons[itemId].etypeId;
  let description = $dataWeapons[itemId].description;
  let itemWeight = $dataWeapons[itemId].meta.itemWeight;
  let itypeId = $dataWeapons[itemId].itypeId;
  let categories = $dataWeapons[itemId].categories;
  let meta = $dataWeapons[itemId].meta;
  this.depositItem(containerId-1, Number(itemId), Number(amount), name, Number(iconIndex), etypeId, description, itemWeight, itypeId, categories, meta);
  this.eraseEmptyItemEntry(containerId);
};


Game_Containers.prototype.addArmorToContainer = function(containerId, itemId, amount) {
  let name = $dataArmors[itemId].name;
  let iconIndex = $dataArmors[itemId].iconIndex;
  let etypeId = $dataArmors[itemId].etypeId;
  let description = $dataArmors[itemId].description;
  let itemWeight = $dataArmors[itemId].meta.itemWeight;
  let itypeId = $dataArmors[itemId].itypeId;
  let categories = $dataArmors[itemId].categories;
  let meta = $dataArmors[itemId].meta;
  this.depositItem(containerId-1, Number(itemId), Number(amount), name, Number(iconIndex), etypeId, description, itemWeight, itypeId, categories, meta);
  this.eraseEmptyItemEntry(containerId);
};

//*~ new functions for take all items from containers feature

Game_Containers.prototype.storeInventoryContentsDataToObjects = function() {
	this._storedInventoryContents = $gameParty.allItems();
	for(let i = 0; i < $gameParty.allItems().length; i++) {
		if($gameParty.allItems()[i].etypeId === undefined) {
			this._storedInventoryContents[i].itemAmount = $gameParty._items[$gameParty.allItems()[i].id];
		} else if ($gameParty.allItems()[i].etypeId === 1) {
			this._storedInventoryContents[i].itemAmount = $gameParty._weapons[$gameParty.allItems()[i].id];
		} else if ($gameParty.allItems()[i].etypeId > 1) {
			this._storedInventoryContents[i].itemAmount = $gameParty._armors[$gameParty.allItems()[i].id];
		}
	};
};

Game_Containers.prototype.combineInventoryWithContainersContents = function() {
	for(let i = 0; i < this._storedContainerContents.length; i++) {
		if(this._storedContainerContents[i]) {
			for(let i2 = 0; i2 < this._storedContainerContents[i].length; i2++) {
				if(this._storedContainerContents[i][i2].etypeId === undefined) { // *~ For Items
					if($gameParty._items[this._storedContainerContents[i][i2].id]) {
							$gameParty._items[this._storedContainerContents[i][i2].id] += this._storedContainerContents[i][i2].itemAmount;
						} else {
							$gameParty._items[this._storedContainerContents[i][i2].id] = this._storedContainerContents[i][i2].itemAmount;
						}
					} else if(this._storedContainerContents[i][i2].etypeId === 1) { // *~ For Weapons
						if($gameParty._weapons[this._storedContainerContents[i][i2].id]) {
							$gameParty._weapons[this._storedContainerContents[i][i2].id] += this._storedContainerContents[i][i2].itemAmount;
						} else {
							$gameParty._weapons[this._storedContainerContents[i][i2].id] = this._storedContainerContents[i][i2].itemAmount;
						}
					} else if(this._storedContainerContents[i][i2].etypeId > 1) { //*~ For Armors
						if($gameParty._armors[this._storedContainerContents[i][i2].id]) {
							$gameParty._armors[this._storedContainerContents[i][i2].id] += this._storedContainerContents[i][i2].itemAmount;
						} else {
							$gameParty._armors[this._storedContainerContents[i][i2].id] = this._storedContainerContents[i][i2].itemAmount;
					}
				}
			}
		}
	}
};

Game_Containers.prototype.takeAllContainersContents = function(containerIds) {
	containerIds = containerIds.split(',').map(Number);
	this._storedContainerContents = [];
	this.storeInventoryContentsDataToObjects();
	for(let i = 0; i < containerIds.length; i++) {
		id = containerIds[i]-1;
		itemArray = this._containers[id].itemArray;
		this._containers[id].itemArray = [];
		this._storedContainerContents[id] = itemArray;
	}
	this.combineInventoryWithContainersContents();
};

Game_Containers.prototype.putBackContainersContents = function() {
	for(let i = 0; i < this._storedContainerContents.length; i++) { //* searching all stored containers.
		if(this._storedContainerContents[i]) {
			for(let i2 = 0; i2 < this._storedContainerContents[i].length; i2++) { //* searching all stored items in a container
				for(let i3 = 0; i3 < $gameParty.allItems().length; i3++) { //* Searching inventory
					if(this._storedContainerContents[i][i2] && this._storedContainerContents[i][i2].id === $gameParty.allItems()[i3].id && this._storedContainerContents[i][i2].etypeId === $gameParty.allItems()[i3].etypeId) { //* verify item is exactly the same
						item = $gameParty.allItems()[i3];
						id = item.id;
						index = this._containers[i].itemArray.findIndex(item => item.id === id);
						if(this._storedContainerContents[i][i2].etypeId === undefined) { //* For Items
							if(index === -1) {
								this.depositItem(i,item.id,1,item.name,item.iconIndex,item.etypeId,item.description,item.meta.itemWeight,item.itypeId,item.categories,item.meta);
								$gameParty._items[id]--;
							}
							index = this._containers[i].itemArray.findIndex(item => item.id === id);
							while(this._containers[i].itemArray[index].itemAmount < this._storedContainerContents[i][i2].itemAmount && $gameParty._items[id] !== 0 && $gameParty._items[id] !== undefined) {
								$gameParty._items[id]--;
								this._containers[i].itemArray[index].itemAmount++;
							}
						} else if(this._storedContainerContents[i][i2].etypeId === 1) { //* For Weapons
							if(index === -1) {
								this.depositItem(i,item.id,1,item.name,item.iconIndex,item.etypeId,item.description,item.meta.itemWeight,item.itypeId,item.categories,item.meta);
								$gameParty._weapons[id]--;
							}
							index = this._containers[i].itemArray.findIndex(item => item.id === id);
							while(this._containers[i].itemArray[index].itemAmount < this._storedContainerContents[i][i2].itemAmount && $gameParty._weapons[id] !== 0 && $gameParty._weapons[id] !== undefined) {
								$gameParty._weapons[id]--;
								this._containers[i].itemArray[index].itemAmount++;
							}
						} else if(this._storedContainerContents[i][i2].etypeId > 1) { //* For Armors
							if(index === -1) {
								this.depositItem(i,item.id,1,item.name,item.iconIndex,item.etypeId,item.description,item.meta.itemWeight,item.itypeId,item.categories,item.meta);
								$gameParty._armors[id]--;
							}
							index = this._containers[i].itemArray.findIndex(item => item.id === id);
							while(this._containers[i].itemArray[index].itemAmount < this._storedContainerContents[i][i2].itemAmount && $gameParty._armors[id] !== 0 && $gameParty._armors[id] !== undefined) {
								$gameParty._armors[id]--;
								this._containers[i].itemArray[index].itemAmount++;
							}
						}
					}
				}
			}
		}
	}
	this.clearDataObjectWithZeroValue($gameParty._items);
	this.clearDataObjectWithZeroValue($gameParty._weapons);
	this.clearDataObjectWithZeroValue($gameParty._armors);
};

Game_Containers.prototype.clearDataObjectWithZeroValue = function(dataObject) {
    for (var key in dataObject) {
        if (dataObject[key] == 0) delete dataObject[key];
    }
};

// *~ END

Game_Containers.prototype.visustellaItemEquipCorePluginCheck = function() {
    if($plugins.find(plugin => plugin.name == "VisuMZ_1_ItemsEquipsCore")?.status) {
        return true;
    } else {
        return false;
    }
};

Game_Containers.prototype.dmIndependentItemsPluginCheck = function() {
    if($plugins.find(plugin => plugin.name == "DM_IndependentItems")?.status) {
        return true;
    } else {
        return false;
    }
};

Game_Containers.prototype.dmItemCategoryPluginCheck = function() {
    if($plugins.find(plugin => plugin.name == "DM_ItemCategories")?.status) {
        return true;
    } else {
        return false;
    }
};

Game_Containers.prototype.callItemScene = function() {
	return SceneManager.push(Scene_Item);
};

Game_Containers.prototype.initInventoryMechanics = function() {
	this._inventoryMechanics = Dungeonmind.LI.inventoryMechanics;
};

Game_Containers.prototype.getInventoryMechanics = function() {
	return this._inventoryMechanics;
};

Game_Containers.prototype.setInventoryMechanics = function(value) {
	this._inventoryMechanics = value;
	return this._inventoryMechanics;
};

Game_Containers.prototype.getContainerItemCount = function(shopId) {
	var itemArray = this._containers[shopId-1].itemArray;
	var itemCount = 0;
	for(let i = 0; i < itemArray.length; i++) {
		num = itemArray[i].itemAmount;
		itemCount+=num;
	}
	return itemCount;
};

//-----------------------------------------------------------------------------
// DataManager
//-----------------------------------------------------------------------------

Dungeonmind.LI.ALIAS_DataManager_createGameObjects = DataManager.createGameObjects;

DataManager.createGameObjects = function() {
    Dungeonmind.LI.ALIAS_DataManager_createGameObjects.call(this);
    $gameContainers = new Game_Containers();
};

Dungeonmind.LI.ALIAS_DataManager_makeSavecontents = DataManager.makeSaveContents;

DataManager.makeSaveContents = function() {
    // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
    const contents = Dungeonmind.LI.ALIAS_DataManager_makeSavecontents.call(this);
    contents.containers = $gameContainers;
    return contents;
};

Dungeonmind.LI.ALIAS_DataManger_extractSaveContents = DataManager.extractSaveContents;

DataManager.extractSaveContents = function(contents) {
    Dungeonmind.LI.ALIAS_DataManger_extractSaveContents.call(this, contents);
    $gameContainers = contents.containers;
};

//-----------------------------------------------------------------------------
// Scene_ItemBase
//
// The superclass of Scene_Item and Scene_Skill.

Dungeonmind.LI.ALIAS_SceneItemBase_applyItem = Scene_ItemBase.prototype.applyItem;

Scene_ItemBase.prototype.applyItem = function() {
    Dungeonmind.LI.ALIAS_SceneItemBase_applyItem.call(this);
    if(SceneManager._scene._inventoryTitleWindow){SceneManager._scene._inventoryTitleWindow.refresh()};
};

//-----------------------------------------------------------------------------
// Scene_Item
//
// The scene class of the item screen.

Dungeonmind.LI.ALIAS_SceneItem_create = Scene_Item.prototype.create;

Scene_Item.prototype.create = function() {
    Dungeonmind.LI.ALIAS_SceneItem_create.call(this);
    this.createInventoryTitleWindow();
    if(Dungeonmind.LI.itemWeightWindow) {
        this.createItemWeightWindow();
    }
    this.createActorWindow();
    this.createItemActionWindow();
    this._itemWindow.deactivate();
    this._itemWindow.deselect();
    this._categoryWindow.activate();
    this._itemWindow.setHandler("cancel", this.onItemDMCancel.bind(this));
};

Scene_Item.prototype.createItemActionWindow = function() {
    const rect = this.itemActionRectWindow();
    this._itemActionWindow = new Window_ItemAction(rect);
    this._itemActionWindow.setHandler('use', this.onActionUse.bind(this));
    this._itemActionWindow.setHandler('drop', this.onActionDrop.bind(this));
    this._itemActionWindow.setHandler('back', this.onActionBack.bind(this));
    this._itemActionWindow.setHandler('cancel', this.onActionBack.bind(this));
    this.addWindow(this._itemActionWindow);
    this._itemActionWindow.hide();
};

Scene_Item.prototype.createCategoryWindow = function() {
    const rect = this.categoryWindowRect();
    this._categoryWindow = new Window_ItemDMCategory(rect);
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};

Scene_Item.prototype.popScene = function() {
	if($gameContainers.getInventoryMechanics() === 'Restrictive') {
		if($gameContainers.getCurrentPartyInventoryWeight() > $gameContainers.getCurrentPartyInventoryMaxWeight()) {
			SoundManager.playBuzzer();
			this._categoryWindow.activate();
			this._helpWindow.setWarningText($gameContainers._surpassInvMaxWeightText);
		} else {
			SceneManager.pop();
		}
	} else if($gameContainers.getInventoryMechanics() === 'Relaxed') {
		SceneManager.pop();
	}
};

Scene_Item.prototype.onCategoryOk = function() {
    this._itemWindow.activate();
    this._itemWindow.selectLast();
    this._categoryWindow.deactivate();
};

Scene_Item.prototype.onActionUse = function() {
    const item = this.item();
    if(item.etypeId === 1) {
        SoundManager.playBuzzer();
        this._itemActionWindow.activate();
    } else if(item.etypeId > 1) {
        SoundManager.playBuzzer();
        this._itemActionWindow.activate();
    } else if(item.itypeId === 2) {
        SoundManager.playBuzzer();
        this._itemActionWindow.activate();
    } else if($gameParty.canUse(item)){
        $gameParty.setLastItem(this.item());
        this.determineItem();
        this._itemActionWindow.hide();
        this._itemActionWindow.deactivate();
        this._itemActionWindow.select(-1);
    } else {
        SoundManager.playBuzzer();
        this._itemActionWindow.activate();
    }
};

Scene_Item.prototype.onActionDrop = function() {
    this._itemActionWindow.hide();
    this._itemActionWindow.deactivate();
    const item = this._itemWindow.item();
    $gameContainers.currentItemMax = this.getItemDataAmount(item);
    const rect = this.itemDepositRect();
    const rect2 = this.itemDepositRect2();
    this._depositWindow = new Window_ItemDeposit(rect);
    this._confirmationCommands = new Window_ConfirmationCommands(rect2);
    this._confirmationCommands.setHandler('ok', this.onDropOk.bind(this));
    this._confirmationCommands.setHandler('cancel', this.onDropCancel.bind(this));
    this.addWindow(this._depositWindow);
    this._depositWindow.show();
    this._depositWindow.activate();
    this.addChild(this._confirmationCommands);
    this._confirmationCommands.backOpacity = 0;
    this._confirmationCommands.opacity = 0;
    this._helpWindow.setWarningText($gameContainers._onActionDropText);
};

Scene_Item.prototype.getItemDataAmount = function(item) {
    let items = $gameParty._items;
    if(item.etypeId === 1) {
        items = $gameParty._weapons;
    } else if(item.etypeId > 1) {
        items = $gameParty._armors;
    }
    return items[item.id];
};

Scene_Item.prototype.dropItem = function(item) {
    let items = $gameParty._items;
    if(item.etypeId === 1) {
        items = $gameParty._weapons;
    } else if(item.etypeId > 1) {
        items = $gameParty._armors;
    }
    if(item.etypeId === 1) {
        $gameParty.loseItem($dataWeapons[item.id], this._depositWindow.amount);
        if($gameParty._weapons[item.id] === 0) {
            delete $gameParty._weapons[item.id];
        }
    } else if(item.etypeId > 1) {
        $gameParty.loseItem($dataArmors[item.id], this._depositWindow.amount);
        if($gameParty._armors[item.id] === 0) {
            delete $gameParty._armors[item.id];
        }
    } else {
        $gameParty.loseItem($dataItems[item.id], this._depositWindow.amount);
        if($gameParty._items[item.id] === 0) {
            delete $gameParty._items[item.id];
        }
    }
};

Scene_Item.prototype.checkDropPermission = function(item) {
    if(item.meta.undroppable) {
        return false;
    } else {
        return true;
    }
};

Scene_Item.prototype.onDropOk = function() {
    const item = this._itemWindow.item();
    if(!this.checkDropPermission(item)) {
        SoundManager.playBuzzer();
        this._helpWindow.setWarningText($gameContainers._itemCannotBeDroppedText);
        this._confirmationCommands.activate();
        return;
    }
    SoundManager.playOk();
    this.playDropSe();
    this.dropItem(item);
    this._itemWindow.activate();
    this._itemWindow.refresh();
    this._inventoryTitleWindow.refresh();
    this._depositWindow.hide();
    this._depositWindow.deactivate();
    this._depositWindow.select(-1);
    this._confirmationCommands.hide();
    this._confirmationCommands.deactivate();
    if(this._itemWindow._data[this._itemWindow.index()] === undefined && this._itemWindow.index() !== 0) { // *Edit Deselect last when item is gone.
       this._itemWindow.select(this._itemWindow.index()-1);
    }
};

Scene_Item.prototype.onDropCancel = function() {
    this._itemActionWindow.activate();
    this._itemActionWindow.show();
    this._confirmationCommands.hide();
    this._confirmationCommands.deactivate();
    this._depositWindow.hide();
    this._depositWindow.deactivate();
    this._helpWindow.setWarningText($gameContainers._itemActionWindowText);
};

Scene_Item.prototype.onActionBack = function() {
    this._itemWindow.activate();
    this._itemActionWindow.deactivate();
    this._itemActionWindow.hide();
};

Scene_Item.prototype.createInventoryTitleWindow = function() {
    const rect = this.inventoryRectWindow();
    this._inventoryTitleWindow = new Window_InventoryFooterTitle(rect);
    this.addWindow(this._inventoryTitleWindow);
};

Scene_Item.prototype.createItemWeightWindow = function() {
    const rect = this.itemWeightRectWindow();
    this._itemWeightWindow = new Window_ItemWeight(rect);
    this.addWindow(this._itemWeightWindow);
}

Scene_Item.prototype.itemActionRectWindow = function() {
    const ww = 120;
    const wx = Graphics.boxWidth / 2 - ww / 2;
    const wh = this.calcWindowHeight(3, true);
    const wy = Graphics.boxHeight / 2 - wh / 2;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Item.prototype.inventoryRectWindow = function() {
    const wx = 0
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, false);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Item.prototype.itemWeightRectWindow = function() {
    const wx = 0
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, false);
    const wy = this.mainAreaTop() + this._inventoryTitleWindow.height + this._itemWindow.height + wh + 8;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Item.prototype.itemDepositRect = function() {
    const ww = Dungeonmind.LI.itemWeightWindowWidth;
    const wx = Graphics.boxWidth / 2 - ww / 2;
    const wh = 202;
    const wy = Graphics.boxHeight / 2 - wh / 2;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Item.prototype.itemDepositRect2 = function() {
    const ww = Dungeonmind.LI.itemWeightWindowWidth + 8;
    const wx = Graphics._width / 2 - ww / 2;
    const wh = 120;
    const wy = Graphics._height / 2 - wh / 2 + wh / 2 - 8;
    return new Rectangle(wx, wy, ww, wh);
};


// *Overwritten Functions


Scene_Item.prototype.categoryWindowRect = function() {
    const wx = 0;
    const wy = this.mainAreaTop() + this.calcWindowHeight(1, false);
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Item.prototype.itemWindowRect = function() {
    const wx = 0;
    const wy = this._categoryWindow.y + this._categoryWindow.height;
    let ww = Graphics.boxWidth;
    if($gameContainers.visustellaItemEquipCorePluginCheck()) {
        ww = Graphics.boxWidth - this.statusWidth();
    }
    let wh = this.mainAreaBottom() - wy;
    if(Dungeonmind.LI.itemWeightWindow) {
        wh = this.mainAreaBottom() - wy - this.calcWindowHeight(1, true) + 8;
    }
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Item.prototype.onItemDMCancel = function() {
    if (this._categoryWindow.needsSelection()) {
        this._itemWindow.deselect();
        this._categoryWindow.activate();
        if(this._itemWeightWindow) {this._itemWeightWindow.refresh();}
    } else {
        this.popScene();
    }
};

Scene_Item.prototype.onItemOk = function() {
    const item = this.item();
    if(item) {
      this._itemActionWindow.show();
      this._itemActionWindow.activate();
      this._itemActionWindow.select(0);
      this._helpWindow.setWarningText($gameContainers._itemActionWindowText);
    } else {
      this._itemWindow.activate();
      SoundManager.playBuzzer();
    }
};

Scene_Item.prototype.playDropSe = function() {
    this._item = this._itemWindow.item();
    if(this._item.etypeId === 1) {
        if(this._item.meta.itemSE) {
            return AudioManager.playSe({name: this._item.meta.itemSE, pan: 0, pitch: 100, volume: 100});
        } else {
            this.playWeaponSe();
        }
    } else if(this._item.etypeId > 1) {
        if(this._item.meta.itemSE) {
            return AudioManager.playSe({name: this._item.meta.itemSE, pan: 0, pitch: 100, volume: 100});
        } else {
            this.playArmorSe();
        }
    } else {
        if(this._item.meta.itemSE) {
            return AudioManager.playSe({name: this._item.meta.itemSE, pan: 0, pitch: 100, volume: 100});
        } else {
            this.playItemSe();
        }
    }
}

Scene_Item.prototype.playItemSe = function() {
    return AudioManager.playSe({name: Dungeonmind.LI.itemSe, pan: 0, pitch: 100, volume: 100});
};

Scene_Item.prototype.playWeaponSe = function() {
    return AudioManager.playSe({name: Dungeonmind.LI.weaponSe, pan: 0, pitch: 100, volume: 100});
};

Scene_Item.prototype.playArmorSe = function() {
    return AudioManager.playSe({name: Dungeonmind.LI.armorSe, pan: 0, pitch: 100, volume: 100});
};

//-----------------------------------------------------------------------------
// Scene_Container
//
// The scene class of the Scene_Container screen.

function Scene_Container() {
    this.initialize(...arguments);
}

Scene_Container.prototype = Object.create(Scene_ItemBase.prototype);
Scene_Container.prototype.constructor = Scene_Container;

Scene_Container.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
    this._currentContainerId = 0;
    this._item = {};
};

Scene_Container.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createContainerTitleWindow();
    this.createInventoryTitleWindow();
    this.createCategoryWindow();
    this.createContainerSelectActionWindow();
    this.createItemWindow();
    this.createContainerWindow();
};

Scene_Container.prototype.createContainerSelectActionWindow = function() {
    const rect = this.containerActionSelectWindowRect();
    this._containerActionSelectWindow = new Window_ContainerActionSelect(rect);
    this._containerActionSelectWindow.setHandler("withdraw", this.onContainerWithdrawSelect.bind(this));
    this._containerActionSelectWindow.setHandler("deposit", this.onContainerDepositSelect.bind(this));
    this._containerActionSelectWindow.setHandler("cancel", this.onContainerActionSelectCancel.bind(this));
    this.addWindow(this._containerActionSelectWindow);
    this._containerActionSelectWindow.deactivate();
    this._containerActionSelectWindow.select(-1);
    this._item = {};
};

Scene_Container.prototype.containerActionSelectWindowRect = function() {
    const wx = 0;
    const wy = this._categoryWindow.y + this._categoryWindow.height;
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Container.prototype.onContainerActionSelectCancel = function() {
    this._containerActionSelectWindow.deactivate();
    this._categoryWindow.activate();
    this._containerActionSelectWindow.select(-1);
};

Scene_Container.prototype.onContainerDepositSelect = function() {
    this._containerActionSelectWindow.deactivate();
    this._itemWindow.activate();
    this._itemWindow.selectLast();
};

Scene_Container.prototype.onContainerWithdrawSelect = function() {
    this._containerActionSelectWindow.deactivate();
    this._containerWindow.activate();
    this._containerWindow.select(0);
};

Scene_Container.prototype.createContainerTitleWindow = function() {
    const rect = this.itemTitleContainerRect();
    this._containerTitleWindow = new Window_ContainerTitle(rect);
    this.addWindow(this._containerTitleWindow);
};

Scene_Container.prototype.itemTitleContainerRect = function() {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth / 2;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Container.prototype.createInventoryTitleWindow = function() {
    const rect = this.inventoryTitleRect();
    this._inventoryTitleWindow = new Window_InventoryTitle(rect);
    this.addWindow(this._inventoryTitleWindow);
};

Scene_Container.prototype.inventoryTitleRect = function() {
    const wx = this._containerTitleWindow.width;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth / 2;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Container.prototype.createContainerWindow = function() {
    const rect = this.containerWindowRect();
    this._containerWindow = new Window_ItemContainer(rect);
    this._containerWindow.setHelpWindow(this._helpWindow);
    this._containerWindow.setHandler("ok", this.onItemWithdrawActionOk.bind(this));
    this._containerWindow.setHandler("cancel", this.onItemContainerCancel.bind(this));
    this.addWindow(this._containerWindow);
    this._categoryWindow.setContainerWindow(this._containerWindow);
    if (!this._categoryWindow.needsSelection()) {
        this._containerWindow.y -= this._categoryWindow.height;
        this._containerWindow.height += this._categoryWindow.height;
        this._categoryWindow.hide();
        this._categoryWindow.deactivate();
        this.onCategoryOk();
    }
};

Scene_Container.prototype.containerWindowRect = function() {
    const wx = 0;
    const wy = this._containerActionSelectWindow.y + this._containerActionSelectWindow.height;
    const ww = Graphics.boxWidth / 2;
    const wh = this.mainAreaBottom() - wy;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Container.prototype.createItemWindow = function() {
    const rect = this.itemWindowRect();
    this._itemWindow = new Window_ItemList(rect);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler("ok", this.onItemDepositActionOk.bind(this));
    this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
    if (!this._categoryWindow.needsSelection()) {
        this._itemWindow.y -= this._categoryWindow.height;
        this._itemWindow.height += this._categoryWindow.height;
        this._categoryWindow.hide();
        this._categoryWindow.deactivate();
        this.onCategoryOk();
    }
};

Scene_Container.prototype.itemWindowRect = function() {
    const wx = Graphics.boxWidth / 2;
    const wy = this._containerActionSelectWindow.y + this._containerActionSelectWindow.height;
    const ww = Graphics.boxWidth / 2;
    const wh = this.mainAreaBottom() - wy;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Container.prototype.createCategoryWindow = function() {
    const rect = this.itemCategoryWindowRect();
    this._categoryWindow = new Window_ItemDMCategory(rect);
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler("cancel", this.onItemCategoryCancel.bind(this));
    this.addWindow(this._categoryWindow);
};

Scene_Container.prototype.itemCategoryWindowRect = function() {
    const wx = 0;
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, true);
    const wy = this._containerTitleWindow.y + this._containerTitleWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Container.prototype.onCategoryOk = function() {
    this._containerActionSelectWindow.activate();
    this._containerActionSelectWindow.select(0);
    this._helpWindow.setWarningText($gameContainers._containerCategoryActivatedText);
};

Scene_Container.prototype.onItemDepositActionOk = function() {
    if(this._itemWindow.item()) {
    $gameContainers.setItemName(this._itemWindow.item());
    if(this._itemWindow.item().etypeId === 1) {
        $gameContainers.currentItemMax = $gameParty._weapons[this._itemWindow.item().id];
        } else if(this._itemWindow.item().etypeId > 1) {
        $gameContainers.currentItemMax = $gameParty._armors[this._itemWindow.item().id];
        } else {
        $gameContainers.currentItemMax = $gameParty._items[this._itemWindow.item().id]; 
        }
        $gameContainers.currentItem(this._itemWindow.item());
        this.createItemDepositWindow();
        this._helpWindow.setWarningText($gameContainers._onActionItemDepositText);
        this._depositWindow.activate();
        this._depositWindow.show();
    } else {
        SoundManager.playBuzzer();
        this._itemWindow.activate();
        this._helpWindow.setWarningText($gameContainers._noItemToDepositText);
    }
};

Scene_Container.prototype.onItemWithdrawActionOk = function() {
    if(this._containerWindow.item()) {
        $gameContainers.setItemName(this._containerWindow.item());
        $gameContainers.currentItemMax = this._containerWindow.item().itemAmount;
        this.createItemWithdrawWindow();
        this._helpWindow.setWarningText($gameContainers._onActionItemWithdrawText);
        this._withdrawWindow.activate();
        this._withdrawWindow.show();
    } else {
        SoundManager.playBuzzer();
        this._containerWindow.activate();
        this._helpWindow.setWarningText($gameContainers._noItemToWithdrawText);
    }
};

Scene_Container.prototype.createItemWithdrawWindow = function() {
    const rect = this.itemDepositRect();
    const rect2 = this.itemDepositRect2();
    this._withdrawWindow = new Window_ItemWithdraw(rect);
    this._withdrawWindow.hide();
    this._withdrawWindow.deactivate();
    this._confirmationCommands = new Window_ConfirmationCommands(rect2);
    this._confirmationCommands.setHandler('ok', this.onWithdrawOk.bind(this));
    this._confirmationCommands.setHandler('cancel', this.onWithdrawCancel.bind(this));
    this.addWindow(this._withdrawWindow);
    this.addChild(this._confirmationCommands);
    this._confirmationCommands.backOpacity = 0;
    this._confirmationCommands.opacity = 0;
};

Scene_Container.prototype.createItemDepositWindow = function() {
    const rect = this.itemDepositRect();
    const rect2 = this.itemDepositRect2();
    this._depositWindow = new Window_ItemDeposit(rect);
    this._depositWindow.hide();
    this._depositWindow.deactivate();
    this._confirmationCommands = new Window_ConfirmationCommands(rect2);
    this._confirmationCommands.setHandler('ok', this.onDepositOk.bind(this));
    if($gameContainers.getInventoryMechanics() === 'Restrictive') {
		this._confirmationCommands.setHandler('drop', this.onDropOk.bind(this));
    };
    this._confirmationCommands.setHandler('cancel', this.onDepositCancel.bind(this));
    this.addWindow(this._depositWindow);
    this.addChild(this._confirmationCommands);
    this._confirmationCommands.backOpacity = 0;
    this._confirmationCommands.opacity = 0;
};

Scene_Container.prototype.onDepositOk = function() {
    let item = this._itemWindow.item();
    if(!this.checkDepositPermission(item)) {
        SoundManager.playBuzzer();
        this._helpWindow.setWarningText($gameContainers._itemCannotBeDepositedText);
        this._confirmationCommands.activate();
        return;
    }
    if(!this.checkLootPermission()) {
        SoundManager.playBuzzer();
        this._helpWindow.setWarningText($gameContainers._containerCantTakeAnyItemsText);
        this._confirmationCommands.activate();
        return;
    }
    if($gameContainers.checkAvailableSpace(this._depositWindow.amount)) {
        SoundManager.playOk();
        this.depositItem();
        this.confirmDeposit();
        if(this._itemWindow._data[this._itemWindow.index()] === undefined && this._itemWindow.index() !== 0) { // *Edit Deselect last when item is gone.
        	this._itemWindow.select(this._itemWindow.index()-1);
        }
    } else {
        SoundManager.playBuzzer();
        this._helpWindow.setWarningText($gameContainers._surpassContainerMaxWeightText);
        this._confirmationCommands.activate();
    }
};

Scene_Container.prototype.onDepositCancel = function() {
    this._confirmationCommands.hide();
    this._depositWindow.hide();
    this._itemWindow.activate();
};

Scene_Container.prototype.checkDropPermission = function(item) {
	if(item.meta.undroppable) {
        return false;
    } else {
        return true;
    }
};

Scene_Container.prototype.playDropSe = function() {
	Scene_Item.prototype.playDropSe.call(this);
};

Scene_Container.prototype.dropItem = function(item) {
	Scene_Item.prototype.dropItem.call(this, item);
};

Scene_Container.prototype.onDropOk = function() {
    const item = this._itemWindow.item();
    if(!this.checkDropPermission(item)) {
        SoundManager.playBuzzer();
        this._helpWindow.setWarningText($gameContainers._itemCannotBeDroppedText);
        this._confirmationCommands.activate();
        return;
    }
    SoundManager.playOk();
    this.playDropSe();
    this.dropItem(item);
    this._itemWindow.activate();
    this._itemWindow.refresh();
    this._inventoryTitleWindow.refresh();
    this._depositWindow.hide();
    this._depositWindow.deactivate();
    this._depositWindow.select(-1);
    this._confirmationCommands.hide();
    this._confirmationCommands.deactivate();
    if(this._itemWindow._data[this._itemWindow.index()] === undefined && this._itemWindow.index() !== 0) { // *Edit Deselect last when item is gone.
       this._itemWindow.select(this._itemWindow.index()-1);
    }
};

Scene_Container.prototype.onWithdrawOk = function() {
    if($gameContainers.checkAvailableInventorySpace(this._withdrawWindow.amount)) {
        SoundManager.playOk();
        this.withdrawItem();
        this.confirmWithdraw();
        if(this._containerWindow._data[this._containerWindow.index()] === undefined && this._containerWindow.index() !== 0) { // *Edit Deselect last when item is gone.
        	this._containerWindow.select(this._containerWindow.index()-1);
        }
    } else {
        SoundManager.playBuzzer();
        //title = this.removeTextCodes(Dungeonmind.LI.inventoryTitle);
        this._helpWindow.setWarningText($gameContainers._surpassInvMaxWeightTextInContainer);
        this._confirmationCommands.activate();
    }
};

Scene_Container.prototype.onWithdrawCancel = function() {
    this._confirmationCommands.hide();
    this._withdrawWindow.hide();
    this._containerWindow.activate();
};

Scene_Container.prototype.itemDepositRect = function() {
    const ww = Dungeonmind.LI.itemWeightWindowWidth;
    const wx = Graphics.boxWidth / 2 - ww / 2;
    const wh = 202;
    const wy = Graphics.boxHeight / 2 - wh / 2;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Container.prototype.itemDepositRect2 = function() {
    const ww = Dungeonmind.LI.itemWeightWindowWidth + 8;
    const wx = Graphics._width / 2 - ww / 2;
    const wh = 120;
    const wy = Graphics._height / 2 - wh / 2 + wh / 2 - 8;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Container.prototype.onItemCancel = function() {
    this._itemWindow.deactivate();
    this._containerActionSelectWindow.activate();
    this._helpWindow.setWarningText($gameContainers._containerCategoryActivatedText);
    this._itemWindow.select(-1);
};

Scene_Container.prototype.onItemContainerCancel = function() {
    this._containerWindow.deselect();
    this._containerWindow.deactivate();
    this._containerActionSelectWindow.activate();
    this._helpWindow.setWarningText($gameContainers._containerCategoryActivatedText);
    this._containerWindow.select(-1);
};

Scene_Container.prototype.onItemCategoryCancel = function() {
    this.popScene();
};

Scene_Container.prototype.closeWithdraw = function() {
    this._withdrawWindow.hide();
    this._withdrawWindow.deactivate();
    this._containerWindow.activate()
    this._containerWindow.select(this._containerWindow.index());
}

Scene_Container.prototype.closeDeposit = function() {
    this._depositWindow.hide();
    this._depositWindow.deactivate();
    this._itemWindow.activate()
    this._itemWindow.select(this._itemWindow.index());
}

Scene_Container.prototype.confirmDeposit = function() {
    this._depositWindow.hide();
    this._depositWindow.deactivate();
    this._itemWindow.activate();
    this._itemWindow.select(this._itemWindow.index());
    this._itemWindow.refresh();
    this._helpWindow.setItem(this._itemWindow.item());
    if(this._itemWindow._visualItemInventoryTooltipWindow) {
    	this._itemWindow._visualItemInventoryTooltipWindow.setItem(this._itemWindow.item());
	}
    this._containerTitleWindow.refresh();
    this._containerWindow.refresh();
    this._inventoryTitleWindow.refresh();
    this._confirmationCommands.hide();
    this._depositWindow.hide();
}

Scene_Container.prototype.confirmWithdraw = function() {
    this._withdrawWindow.hide();
    this._withdrawWindow.deactivate();
    this._containerWindow.activate();
    this._containerWindow.refresh();
    this._containerWindow.select(this._containerWindow.index());
    this._containerWindow.refresh();
    this._itemWindow.refresh();
    this._containerTitleWindow.refresh();
    this._inventoryTitleWindow.refresh();
    this._confirmationCommands.hide();
}

Scene_Container.prototype.playActionSe = function() {
    if(this._item.etypeId === 1) {
        if(this._item.meta.itemSE) {
            return AudioManager.playSe({name: this._item.meta.itemSE, pan: 0, pitch: 100, volume: 100});
        } else {
            this.playWeaponSe();
        }
    } else if(this._item.etypeId > 1) {
        if(this._item.meta.itemSE) {
            return AudioManager.playSe({name: this._item.meta.itemSE, pan: 0, pitch: 100, volume: 100});
        } else {
            this.playArmorSe();
        }
    } else {
        if(this._item.meta.itemSE) {
            return AudioManager.playSe({name: this._item.meta.itemSE, pan: 0, pitch: 100, volume: 100});
        } else {
            this.playItemSe();
        }
    }
}

Scene_Container.prototype.playWithdrawActionSe = function() {
    if(this._item.etypeId === 1) {
        if(this._item.meta.itemSE) {
            return AudioManager.playSe({name: this._item.meta.itemSE, pan: 0, pitch: 100, volume: 100});
        } else {
            this.playWeaponSe();
        }
    } else if(this._item.etypeId > 1) {
        if(this._item.meta.itemSE) {
            return AudioManager.playSe({name: this._item.meta.itemSE, pan: 0, pitch: 100, volume: 100});
        } else {
            this.playArmorSe();
        }
    } else {
        if(this._item.meta.itemSE) {
            return AudioManager.playSe({name: this._item.meta.itemSE, pan: 0, pitch: 100, volume: 100});
        } else {
            this.playItemSe();
        }
    }
}

Scene_Container.prototype.playItemSe = function() {
    return AudioManager.playSe({name: Dungeonmind.LI.itemSe, pan: 0, pitch: 100, volume: 100});
};

Scene_Container.prototype.playWeaponSe = function() {
    return AudioManager.playSe({name: Dungeonmind.LI.weaponSe, pan: 0, pitch: 100, volume: 100});
};

Scene_Container.prototype.playArmorSe = function() {
    return AudioManager.playSe({name: Dungeonmind.LI.armorSe, pan: 0, pitch: 100, volume: 100});
};

Scene_Container.prototype.depositItem = function() {
    var item = this._itemWindow.item();
    this._item = item;
    if(this._depositWindow.amount !== 0) {
        this.origAmount = this._depositWindow.amount;
        $gameContainers.depositItem($gameContainers.tempId - 1,item.id,this._depositWindow.amount,item.name,item.iconIndex,item.etypeId,item.description,item.meta.itemWeight,item.itypeId,item.categories,item.meta);
        if(item.etypeId === 1) {
            $gameParty.loseItem($dataWeapons[$gameContainers.tempItem.id], this._depositWindow.amount);
        } else if(item.etypeId > 1) {
            $gameParty.loseItem($dataArmors[$gameContainers.tempItem.id], this._depositWindow.amount);
        } else {
            $gameParty.loseItem($dataItems[$gameContainers.tempItem.id], this._depositWindow.amount);
        }
        this.playActionSe();
    } else {
        SoundManager.playCancel();
    }
};

Scene_Container.prototype.withdrawItem = function() {
    var item = this._containerWindow.item();
    if(this._withdrawWindow.amount !== 0) {
        this.origAmount = this.amount;
        $gameContainers.withdrawItem(item.itemId,this._withdrawWindow.amount,item.etypeId);
        $gameContainers.takeContainerItems(item.itemId,this._withdrawWindow.amount,item.etypeId);
        this._item = item;
        this.playWithdrawActionSe();
    } else {
        SoundManager.playCancel();
    }
};

Scene_Container.prototype.checkDepositPermission = function(item) {
    if(item.meta.undepositable) {
        return false;
    } else {
        return true;
    }
};

Scene_Container.prototype.checkLootPermission = function() {
    if($gameContainers._containers[$gameContainers.tempId-1].containerLoot) {
        return false;
    } else {
        return true;
    }
};

Scene_Container.prototype.removeTextCodes = function(text) {
    text = text.replaceAll(/[0-9]/g,'');
    text = text.replaceAll('\\C[]','');
    text = text.replaceAll('\\c[]','');
    text = text.replaceAll('\\V[]','');
    text = text.replaceAll('\\v[]','');
    return text;
};

Scene_Container.prototype.popScene = function() {
	if($gameContainers.getInventoryMechanics() === 'Restrictive') {
		if($gameContainers.getCurrentPartyInventoryWeight() > $gameContainers.getCurrentPartyInventoryMaxWeight()) {
			SoundManager.playBuzzer();
			this._categoryWindow.activate();
			this._helpWindow.setWarningText($gameContainers._surpassInvMaxWeightTextInContainer);
		} else {
			SceneManager.pop();
		}
	} else if($gameContainers.getInventoryMechanics() === 'Relaxed') {
		SceneManager.pop();
	}
};

//-----------------------------------------------------------------------------
// Window_ContainerActionSelect
//
// The window for selecting if you want to deposit or make a withdrawl from the
// container.

function Window_ContainerActionSelect() {
    this.initialize(...arguments);
}

Window_ContainerActionSelect.prototype = Object.create(Window_HorzCommand.prototype);
Window_ContainerActionSelect.prototype.constructor = Window_ContainerActionSelect;

Window_ContainerActionSelect.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_ContainerActionSelect.prototype.maxCols = function() {
    return 2;
};

Window_ContainerActionSelect.prototype.makeCommandList = function() {
    this.addCommand('Withdraw','withdraw');
    this.addCommand('Deposit','deposit')
};

//-----------------------------------------------------------------------------
// Window_ConfirmationCommands
//
// The window for selecting if you want to deposit or make a withdrawl from the
// container.

function Window_ConfirmationCommands() {
    this.initialize(...arguments);
}

Window_ConfirmationCommands.prototype = Object.create(Window_Command.prototype);
Window_ConfirmationCommands.prototype.constructor = Window_ConfirmationCommands;

Window_ConfirmationCommands.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
};

Window_ConfirmationCommands.prototype.makeCommandList = function() {
    if(SceneManager._scene instanceof Scene_Container && $gameContainers.getInventoryMechanics() === 'Restrictive') { 
    	this.makeCommandListForContainer();
    	return;
    }
    this.addCommand('Confirm','ok');
    this.addCommand('Back','cancel');
};

Window_ConfirmationCommands.prototype.makeCommandListForContainer = function() {
    this.addCommand('Confirm','ok');
	this.addCommand('Drop','drop');
};

//-----------------------------------------------------------------------------
// Window_ItemAction
//
// The window selecting if you want to use or drop an item.

function Window_ItemAction() {
    this.initialize(...arguments);
}

Window_ItemAction.prototype = Object.create(Window_Command.prototype);
Window_ItemAction.prototype.constructor = Window_ItemAction;

Window_ItemAction.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
};

Window_ItemAction.prototype.makeCommandList = function() {
    this.addCommand('Use','use');
    this.addCommand('Drop','drop');
    this.addCommand('Back','back');
};

//-----------------------------------------------------------------------------
// Window_Help
//
// The window for displaying the description of the selected item.

Window_Help.prototype.setWarningText = function(text) {
    this.setText(text);
};

//-----------------------------------------------------------------------------
// Window_ItemList
//
// The window for selecting an item on the item screen.

Window_ItemList.prototype.isEnabled = function(item) {
    return true;
};

Window_ItemList.prototype.numberWidth = function() {
    if(Dungeonmind.LI.itemMaxDefault > 999) {
        return this.textWidth("00000");
    } else if(Dungeonmind.LI.itemMaxDefault > 99) {
        return this.textWidth("0000");
    } else {
        return this.textWidth("000");
    }
};

Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    if (this.needsNumber()) {
        if($gameParty.numItems(item) <= 9) {
            this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("0"), "right");
        } else if($gameParty.numItems(item) <= 99) {
            this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("00"), "right");
        } else if($gameParty.numItems(item)<= 999) {
            this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("000"), "right");
        } else if($gameParty.numItems(item) <= 9999) {
            this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("0000"), "right");
        }
        this.drawText($gameParty.numItems(item), x, y, width, "right");
    }
};

if(Dungeonmind.LI.itemLayout === 'RPG Maker Default') {
	Window_ItemList.prototype.maxCols = function() {
    	return Dungeonmind.LI.maxColms;
	};
}

Window_ItemList.prototype.includes = function(item) {
    switch (this._category) {
        case "all":
            return item !== null;
        case "item":
            return DataManager.isItem(item) && item.itypeId === 1;
        case "weapon":
            return DataManager.isWeapon(item);
        case "armor":
            return DataManager.isArmor(item);
        case "keyItem":
            return DataManager.isItem(item) && item.itypeId === 2;
        default:
            return false;//this.includeNewCategories(item);
    }
};

Window_ItemList.prototype.includeNewCategories = function(item) {
    for(let i = 0; i < $gameCategories._symbols.length; i++) {
        if(item !== null && item.meta.category === $gameCategories._symbols[i] && this._category === $gameCategories._symbols[i]) {
            return true;
        }
    }
    return false;
};

//Window_ItemList.prototype.makeItemList = function() {
    //this._data = $gameParty.allItems().filter(item => this.includes(item));
    //if(this._category === 'all') {
      //this._data = $gameParty.allItems();
    //}
    //if (this.includes(null)) {
        //this._data.push(null);
    //}
//};

//-----------------------------------------------------------------------------
// Window_ItemContainer
//
// The window for viewing items in a container.

function Window_ItemContainer() {
    this.initialize(...arguments);
}

Window_ItemContainer.prototype = Object.create(Window_ItemList.prototype);
Window_ItemContainer.prototype.constructor = Window_ItemContainer;

Window_ItemContainer.prototype.initialize = function(rect) {
    Window_ItemList.prototype.initialize.call(this, rect);
    this._category = "none";
    this._data = [];
    this.refresh();
};

Window_ItemContainer.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
        this.refresh();
        this.scrollTo(0, 0);
    }
};

if(Dungeonmind.LI.itemLayout === 'RPG Maker Default') {
	Window_ItemContainer.prototype.maxCols = function() {
    	return Dungeonmind.LI.maxColms;
	};
}

Window_ItemContainer.prototype.isCurrentItemEnabled = function() {
    return true;//this.isEnabled(this.item());
};

Window_ItemContainer.prototype.includes = function(item) {
    switch (this._category) {
        case "item":
            return DataManager.isItem(item) && item.itypeId === 1;
        case "weapon":
            return DataManager.isWeapon(item);
        case "armor":
            return DataManager.isArmor(item);
        case "keyItem":
            return DataManager.isItem(item) && item.itypeId === 2;
        case "all":
          return item !== null;
        default:
            return this.includeNewCategories();
    }
};

Window_ItemContainer.prototype.includeNewCategories = function(item) {
    for(let i = 0; i < $gameCategories._symbols.length; i++) {
        if(item !== null && this.getCategories(item, $gameCategories._symbols[i]) && this._category === $gameCategories._symbols[i]) {
            return true;
        }
    }
    return false;
};

Window_ItemContainer.prototype.getCategories = function(item, symbol) {
    if(item && item.categories) {
        for(let i = 0; i < item.categories.length; i++) {
        	cat = item.categories[i];
            if(cat.toLowerCase() === symbol) {
                return true;
            }
        }
    }
    return false;
};

Window_ItemContainer.prototype.needsNumber = function() {
    if (this._category === "keyItem") {
        return $dataSystem.optKeyItemsNumber;
    } else {
        return true;
    }
};

Window_ItemContainer.prototype.isEnabled = function(item) {
    return true;//$gameParty.canUse(item);
};

Window_ItemContainer.prototype.makeItemList = function(item) {
    if(this._category === 'item') {
        this.makeItemsList();
    } else if(this._category === 'weapon') {
        this.makeWeaponList();
    } else if(this._category === 'armor') {
        this.makeArmorList();
    } else if(this._category === 'keyItem') {
        this.makeKeyItemsList();
    } else if(this._category === 'all') {
        this.makeAllItemList();
    } else {
        this.makeNewCategoryList();
    }
};

Window_ItemContainer.prototype.makeNewCategoryList = function() {
    this._data = []; // Clear data first before making list
    var itemArray = $gameContainers._containers[$gameContainers.tempId - 1].itemArray
    for(let i = 0; i < itemArray.length; i++) {
        if(itemArray[i] && this.getCategories(itemArray[i], this._category)) {
            this._data.push(itemArray[i]);
        }
    }
}

Window_ItemContainer.prototype.makeAllItemList = function() {
  this._data = []; // Clear data first before making list
  var itemArray = $gameContainers._containers[$gameContainers.tempId - 1].itemArray
    for(let i = 0; i < itemArray.length; i++) {
      this._data.push(itemArray[i]);
    }
};

Window_ItemContainer.prototype.makeKeyItemsList = function(item) {
    this._data = []; // Clear data first before making list
    var itemArray = $gameContainers._containers[$gameContainers.tempId - 1].itemArray
    for(let i = 0; i < itemArray.length; i++) {
        if(itemArray[i] && itemArray[i].itypeId === 2) {
            this._data.push(itemArray[i]);
        }
    }
};


Window_ItemContainer.prototype.makeItemsList = function(item) {
    this._data = []; // Clear data first before making list
    var itemArray = $gameContainers._containers[$gameContainers.tempId - 1].itemArray
    for(let i = 0; i < itemArray.length; i++) {
        if(itemArray[i] && itemArray[i].etypeId === undefined && itemArray[i].itypeId !== 2) {
            this._data.push(itemArray[i]);
        }
    }
};

Window_ItemContainer.prototype.makeWeaponList = function(item) {
    this._data = []; // Clear data first before making list
    var itemArray = $gameContainers._containers[$gameContainers.tempId - 1].itemArray
    for(let i = 0; i < itemArray.length; i++) {
        if(itemArray[i].etypeId === 1) {
            this._data.push(itemArray[i]);
        }
    }
};

Window_ItemContainer.prototype.makeArmorList = function(item) {
    this._data = []; // Clear data first before making list
    var itemArray = $gameContainers._containers[$gameContainers.tempId - 1].itemArray
    for(let i = 0; i < itemArray.length; i++) {
        if(itemArray[i].etypeId > 1) {
            this._data.push(itemArray[i]);
        }
    }
};

Window_ItemContainer.prototype.numberWidth = function() {
    if(Dungeonmind.LI.itemMaxDefault > 999) {
        return this.textWidth("00000");
    } else if(Dungeonmind.LI.itemMaxDefault > 99) {
        return this.textWidth("0000");
    } else {
        return this.textWidth("000");
    }
};

if(Dungeonmind.LI.itemLayout === 'RPG Maker Default') {
	Window_ItemContainer.prototype.drawItemName = function(item, x, y, width) {
    	if (item) {
        	const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        	const textMargin = ImageManager.iconWidth + 4;
        	const itemWidth = Math.max(0, width - textMargin);
        	this.resetTextColor();
        	this.drawIcon(item.iconIndex, x, iconY);
        	this.drawText(item.name, x + textMargin, y, itemWidth);
    	}
	};

	Window_ItemContainer.prototype.drawItem = function(index) {
    	const item = this.itemAt(index);
    	if (item) {
        	const numberWidth = this.numberWidth();
        	const rect = this.itemLineRect(index);
        	this.changePaintOpacity(this.isEnabled(item));
        	this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        	this.drawItemNumber(item, rect.x, rect.y, rect.width);
        	this.changePaintOpacity(1);
    	}
	};
}

Window_ItemContainer.prototype.drawItemNumber = function(item, x, y, width) {
    if (item.meta && item.meta.independentItem) {
        if (Dungeonmind.II && Dungeonmind.II.independentItemsAmountText && this.needsNumber()) {
            if(item.itemAmount <= 9) {
                this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("0"), "right");
            } else if(item.itemAmount <= 99) {
                this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("00"), "right");
            } else if(item.itemAmount <= 999) {
                this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("000"), "right");
            } else if(item.itemAmount <= 9999) {
                this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("0000"), "right");
            }
            this.drawText(item.itemAmount, x, y, width, "right");
        }
    }
    if(item.meta && !item.meta.independentItem || !$gameContainers.dmIndependentItemsPluginCheck()) {
        if (this.needsNumber()) {
            if(item.itemAmount <= 9) {
                this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("0"), "right");
            } else if(item.itemAmount <= 99) {
                this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("00"), "right");
            } else if(item.itemAmount <= 999) {
                this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("000"), "right");
            } else if(item.itemAmount <= 9999) {
                this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("0000"), "right");
            }
            this.drawText(item.itemAmount, x, y, width, "right");
        }
    }
};

Window_ItemContainer.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

Window_ItemContainer.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};

//-----------------------------------------------------------------------------
// Window_ItemDeposit
//
// The window for selecting amount to deposit in container.

function Window_ItemDeposit() {
    this.initialize(...arguments);
}

Window_ItemDeposit.prototype = Object.create(Window_Selectable.prototype);
Window_ItemDeposit.prototype.constructor = Window_ItemDeposit;

Window_ItemDeposit.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.amount = $gameContainers._itemDefaultQuantity;
    this.maxAmount = 0;
    this.newAmount = 0;
    if(Dungeonmind.LI.inventoryType === 'Item Weight') {
    	this.drawItemAmount();
    	this.drawItemWeight();
    	this.drawHeaders();
    } else if (Dungeonmind.LI.inventoryType === 'Slot Based') {
    	this.drawSlotBasedItemAmount();
    }
    this.drawBGs();
};

Window_ItemDeposit.prototype.update = function() {
    if(this.isOpenAndActive()) {
    	if(Input.isRepeated("right") && this.amount === $gameContainers.currentItemMax) {
        	SoundManager.playCursor();
        	this.amount = $gameContainers._itemDefaultQuantity;
        	this.refresh();
    	} else {
        	if (Input.isRepeated("right") && this.amount < $gameContainers.currentItemMax) {
            	if(Input.isPressed("shift")) {
                	this.processItemAmount(10);
            	} else {
                	this.processItemAmount(1);
            	}
        	}
    	}
        if(Input.isRepeated("left") && this.amount === $gameContainers._itemDefaultQuantity) {
        	SoundManager.playCursor();
        	this.amount = $gameContainers.currentItemMax;
        	this.refresh();
        } else {
        	if(Input.isRepeated("left") && this.amount > 0) {
            	if(Input.isPressed("shift")) {
                	this.processItemAmount(-10);
            	} else {
                	this.processItemAmount(-1);
            	}
        	}
    	}
    }
};

Window_ItemDeposit.prototype.refresh = function() {
    this.contents.clear();
    if(Dungeonmind.LI.inventoryType === 'Item Weight') {
    	this.drawItemAmount();
    	this.drawItemWeight();
    	this.drawHeaders();
    } else if (Dungeonmind.LI.inventoryType === 'Slot Based') {
    	this.drawSlotBasedItemAmount();
    }
    //this.drawBGs();
};

Window_ItemDeposit.prototype.drawHeaders = function() {
    const textWidth = this.contents.measureTextWidth(Dungeonmind.LI.itemWeightText);
    let x = Dungeonmind.LI.itemWeightWindowText_X_Offset + 30;
    this.drawText(Dungeonmind.LI.itemWeightText,x + this.width/2,5, this.width);
    this.drawIcon(Dungeonmind.LI.itemWeightIcon,x + this.width/2-32,this.lineHeight()-30);
}

Window_ItemDeposit.prototype.drawBGs = function() {
    const c1 = ColorManager.itemBackColor1();
    const c2 = ColorManager.itemBackColor2();
    const x = 0;
    const y = 0;
    const w = this.width;
    const h = this.lineHeight() + this.itemPadding();
    this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, false);
    this.contentsBack.gradientFillRect(x, y*2+h+3, w, h, c1, c2, false);
};

Window_ItemDeposit.prototype.drawItemAmount = function() {
    var name = Dungeonmind.LI.itemAmountText;
    var itemIcon = SceneManager._scene._itemWindow.item().iconIndex;
    this.maxAmount = $gameContainers.currentItemMax;
    const textWidth = this.contents.measureTextWidth(name);
    this.drawText(name, 28+32+Dungeonmind.LI.itemWeightWindowText_X_Offset,5);
    this.drawIcon(itemIcon,26+Dungeonmind.LI.itemWeightWindowText_X_Offset,this.lineHeight()-30);
    this.drawText(this.amount + '/' + this.maxAmount,textWidth/2+40+Dungeonmind.LI.itemWeightWindowNumbers_X_Offset,this.lineHeight()*2-20);
};

Window_ItemDeposit.prototype.drawItemWeight = function() {
    const item = SceneManager._scene._itemWindow.item();
    const itemWeight = this.amount * $gameContainers.checkItemWeight(item);
    var name = Dungeonmind.LI.itemAmountText;
    const textWidth = this.contents.measureTextWidth(name);
    this.drawText(parseFloat(itemWeight.toFixed(4)),this.width/2+textWidth/2+36+Dungeonmind.LI.itemWeightWindowNumbers_X_Offset,this.lineHeight()*2-20);
};

Window_ItemDeposit.prototype.drawSlotBasedItemAmount = function() {
    var name = Dungeonmind.LI.itemAmountText;
    var itemIcon = SceneManager._scene._itemWindow.item().iconIndex;
    this.maxAmount = $gameContainers.currentItemMax;
    const textWidth = this.contents.measureTextWidth(name);
    var x = this.width/2 - textWidth/2 - this.padding-18;
    this.drawText(name, x+32+Dungeonmind.LI.itemWeightWindowText_X_Offset,5);
    this.drawIcon(itemIcon,x+Dungeonmind.LI.itemWeightWindowText_X_Offset,this.lineHeight()-30);
    this.drawText(this.amount + '/' + this.maxAmount,x+42+Dungeonmind.LI.itemWeightWindowNumbers_X_Offset,this.lineHeight()*2-20);
};

Window_ItemDeposit.prototype.processItemAmount = function(amount) {
    SoundManager.playCursor();
    this.amount = (this.amount+=amount).clamp(1, $gameContainers.currentItemMax);
    this.refresh();
};

//-----------------------------------------------------------------------------
// Window_ItemWithdraw
//
// The window for selecting amount to deposit in container.

function Window_ItemWithdraw() {
    this.initialize(...arguments);
}

Window_ItemWithdraw.prototype = Object.create(Window_Selectable.prototype);
Window_ItemWithdraw.prototype.constructor = Window_ItemWithdraw;

Window_ItemWithdraw.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.amount = $gameContainers._itemDefaultQuantity;
    this.maxAmount = 0;
    this.newAmount = 0;
    if(Dungeonmind.LI.inventoryType === 'Item Weight') {
    	this.drawItemAmount();
    	this.drawItemWeight();
    	this.drawHeaders();
    } else if (Dungeonmind.LI.inventoryType === 'Slot Based') {
    	this.drawSlotBasedItemAmount();
    }
    this.drawBGs();
};

Window_ItemWithdraw.prototype.update = function() {
    if(this.isOpenAndActive()) {
    	if(Input.isRepeated("right") && this.amount === $gameContainers.currentItemMax) {
        	SoundManager.playCursor();
        	this.amount = $gameContainers._itemDefaultQuantity;
        	this.refresh();
    	} else {
        	if (Input.isRepeated("right") && this.amount < $gameContainers.currentItemMax) {
            	if(Input.isPressed("shift")) {
                	this.processItemAmount(10);
            	} else {
                	this.processItemAmount(1);
            	}
        	}
    	}
        if(Input.isRepeated("left") && this.amount === $gameContainers._itemDefaultQuantity) {
        	SoundManager.playCursor();
        	this.amount = $gameContainers.currentItemMax;
        	this.refresh();
        } else {
        	if(Input.isRepeated("left") && this.amount > 0) {
            	if(Input.isPressed("shift")) {
                	this.processItemAmount(-10);
            	} else {
                	this.processItemAmount(-1);
            	}
        	}
    	}
    }
};

Window_ItemWithdraw.prototype.refresh = function() {
    this.contents.clear();
    if(Dungeonmind.LI.inventoryType === 'Item Weight') {
    	this.drawItemAmount();
    	this.drawItemWeight();
    	this.drawHeaders();
    } else if (Dungeonmind.LI.inventoryType === 'Slot Based') {
    	this.drawSlotBasedItemAmount();
    }
    //this.drawBGs();
};

Window_ItemWithdraw.prototype.drawHeaders = function() {
    const textWidth = this.contents.measureTextWidth(Dungeonmind.LI.itemWeightText);
    let x = Dungeonmind.LI.itemWeightWindowText_X_Offset + 30;
    this.drawText(Dungeonmind.LI.itemWeightText,x + this.width/2,5, this.width);
    this.drawIcon(Dungeonmind.LI.itemWeightIcon,x + this.width/2-32,this.lineHeight()-30);
}

Window_ItemWithdraw.prototype.drawBGs = function() {
    const c1 = ColorManager.itemBackColor1();
    const c2 = ColorManager.itemBackColor2();
    const x = 0;
    const y = 0;
    const w = this.width;
    const h = this.lineHeight() + this.itemPadding();
    this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, false);
    this.contentsBack.gradientFillRect(x, y*2+h+3, w, h, c1, c2, false);
};

Window_ItemWithdraw.prototype.drawItemAmount = function() {
    var name = Dungeonmind.LI.itemAmountText;
    var itemIcon = SceneManager._scene._containerWindow.item().iconIndex;
    this.maxAmount = $gameContainers.currentItemMax;
    const textWidth = this.contents.measureTextWidth(name);
    this.drawText(name, 28+32+Dungeonmind.LI.itemWeightWindowText_X_Offset,5);
    this.drawIcon(itemIcon,26+Dungeonmind.LI.itemWeightWindowText_X_Offset,this.lineHeight()-30);
    this.drawText(this.amount + '/' + this.maxAmount,textWidth/2+40+Dungeonmind.LI.itemWeightWindowNumbers_X_Offset,this.lineHeight()*2-20);
};

Window_ItemWithdraw.prototype.drawItemWeight = function() {
    const item = SceneManager._scene._containerWindow.item();
    const itemWeight = this.amount * $gameContainers.checkItemWeightContainer(item);
    var name = Dungeonmind.LI.itemAmountText;
    const textWidth = this.contents.measureTextWidth(name);
    this.drawText(parseFloat(itemWeight.toFixed(4)),this.width/2+textWidth/2+36+Dungeonmind.LI.itemWeightWindowNumbers_X_Offset,this.lineHeight()*2-20);
};

Window_ItemWithdraw.prototype.drawSlotBasedItemAmount = function() {
    var name = Dungeonmind.LI.itemAmountText;
    var itemIcon = SceneManager._scene._containerWindow.item().iconIndex;
    this.maxAmount = $gameContainers.currentItemMax;
    const textWidth = this.contents.measureTextWidth(name);
    var x = this.width/2 - textWidth/2 - this.padding-18;
    this.drawText(name, x+32+Dungeonmind.LI.itemWeightWindowText_X_Offset,5);
    this.drawIcon(itemIcon,x+Dungeonmind.LI.itemWeightWindowText_X_Offset,this.lineHeight()-30);
    this.drawText(this.amount + '/' + this.maxAmount,x+42+Dungeonmind.LI.itemWeightWindowNumbers_X_Offset,this.lineHeight()*2-20);
};

Window_ItemWithdraw.prototype.processItemAmount = function(amount) {
    SoundManager.playCursor();
    this.amount = (this.amount+=amount).clamp(1, $gameContainers.currentItemMax);
    this.refresh();
};

//-----------------------------------------------------------------------------
// Window_ContainerTitle
//
// The window for selecting amount to deposit in container.

function Window_ContainerTitle() {
    this.initialize(...arguments);
}

Window_ContainerTitle.prototype = Object.create(Window_Base.prototype);
Window_ContainerTitle.prototype.constructor = Window_ContainerTitle;

Window_ContainerTitle.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.contents.clear();
    this.drawTitle();
};

Window_ContainerTitle.prototype.drawTitle = function(rect) {
    var title = $gameContainers._containers[$gameContainers.tempId - 1].name;
    var maxWidth = Graphics.boxWidth / 2;
    var title2 = this.removeTextCodes(title);
    if(!$gameContainers._containers[$gameContainers.tempId - 1].containerLoot) {
    	$gameContainers.getCurrentContainerMaxSpace() === Infinity ? containerMaxSpace = Dungeonmind.LI.infiniteSymbolText : containerMaxSpace = $gameContainers.getCurrentContainerMaxSpace();
        let text = title2 + '(' + $gameContainers.getCurrentUsedContainerSpace() + '/' + containerMaxSpace + ')';
        var x = Graphics.boxWidth / 4 - this.contents.measureTextWidth(text) / 2 - 16;
        this.drawTextEx(title + '(' + $gameContainers.getCurrentUsedContainerSpace() + '/' + containerMaxSpace + ')', x+16, 6, maxWidth);
    } else {
        let text = title2;
        var x = Graphics.boxWidth / 4 - this.contents.measureTextWidth(text) / 2 - 16;
        this.drawTextEx(title, x+16, 0, maxWidth);
    }
    this.drawIcon($gameContainers._containers[$gameContainers.tempId - 1].storageIconId, x-16, 6);
};

Window_ContainerTitle.prototype.refresh = function() {
    this.contents.clear();
    this.drawTitle();
};

Window_ContainerTitle.prototype.removeTextCodes = function(text) {
    text = text.replaceAll(/[0-9]/g,'');
    text = text.replaceAll('\\C[]','');
    text = text.replaceAll('\\c[]','');
    text = text.replaceAll('\\V[]','');
    text = text.replaceAll('\\v[]','');
    return text;
};

//-----------------------------------------------------------------------------
// Window_InventoryTitle
//
// The window for selecting amount to deposit in container.

function Window_InventoryTitle() {
    this.initialize(...arguments);
}

Window_InventoryTitle.prototype = Object.create(Window_Base.prototype);
Window_InventoryTitle.prototype.constructor = Window_InventoryTitle;

Window_InventoryTitle.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.contents.clear();
    this.drawTitle();
};

Window_InventoryTitle.prototype.drawTitle = function() {
    var title = Dungeonmind.LI.inventoryTitle;
    var maxWidth = Graphics.boxWidth / 2;
    var title2 = this.removeTextCodes(title);
    let text = title2 + '(' + $gameContainers.getCurrentPartyInventoryWeight() + '/' + $gameContainers.getCurrentPartyInventoryMaxWeight() + ')';
    var x = Graphics.boxWidth / 4 - this.contents.measureTextWidth(text) / 2 - 16;
    this.drawTextEx(title + '(' + $gameContainers.getCurrentPartyInventoryWeight() + '/' + $gameContainers.getCurrentPartyInventoryMaxWeight() + ')', x+16, 6, maxWidth);
    this.drawIcon(Dungeonmind.LI.inventoryIcon, x-16, 6);
};

Window_InventoryTitle.prototype.refresh = function() {
    this.contents.clear();
    this.drawTitle();
};

Window_InventoryTitle.prototype.removeTextCodes = function(text) {
    text = text.replaceAll(/[0-9]/g,'');
    text = text.replaceAll('\\C[]','');
    text = text.replaceAll('\\c[]','');
    text = text.replaceAll('\\V[]','');
    text = text.replaceAll('\\v[]','');
    return text;
};

//-----------------------------------------------------------------------------
// Window_InventoryFooterTitle
//
// The window for selecting amount to deposit in container.

function Window_InventoryFooterTitle() {
    this.initialize(...arguments);
}

Window_InventoryFooterTitle.prototype = Object.create(Window_Base.prototype);
Window_InventoryFooterTitle.prototype.constructor = Window_InventoryFooterTitle;

Window_InventoryFooterTitle.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.contents.clear();
    this.drawTitle();
};

Window_InventoryFooterTitle.prototype.drawTitle = function() {
    var title = Dungeonmind.LI.inventoryTitle;
    var maxWidth = Graphics.boxWidth / 2;
    var title2 = this.removeTextCodes(title);
    let text = title2 + '(' + $gameContainers.getCurrentPartyInventoryWeight() + '/' + $gameContainers.getCurrentPartyInventoryMaxWeight() + ')';
    var x = Graphics.boxWidth / 2 - this.contents.measureTextWidth(text) / 2 - 16;
    this.drawTextEx(title + '(' + $gameContainers.getCurrentPartyInventoryWeight() + '/' + $gameContainers.getCurrentPartyInventoryMaxWeight() + ')', x+16, 0, maxWidth);
    this.drawIcon(Dungeonmind.LI.inventoryIcon, x-16, 0);
};

Window_InventoryFooterTitle.prototype.refresh = function() {
    this.contents.clear();
    this.drawTitle();
};

Window_InventoryFooterTitle.prototype.removeTextCodes = function(text) {
    text = text.replaceAll(/[0-9]/g,'');
    text = text.replaceAll('\\C[]','');
    text = text.replaceAll('\\c[]','');
    text = text.replaceAll('\\V[]','');
    text = text.replaceAll('\\v[]','');
    return text;
};

//-----------------------------------------------------------------------------
// Window_ItemWeight
//
// The window for displaying an items weight in the party inventory scene.

function Window_ItemWeight() {
    this.initialize(...arguments);
}

Window_ItemWeight.prototype = Object.create(Window_Base.prototype);
Window_ItemWeight.prototype.constructor = Window_ItemWeight;

Window_ItemWeight.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.contents.clear();
    this.drawItemWeight();
    this._text = '';
};

Window_ItemWeight.prototype.update = function() {
    if(SceneManager._scene._itemWindow.active) {
        this.refresh();
    }
};

Window_ItemWeight.prototype.refresh = function() {
    this.contents.clear();
    this.drawItemWeight();
};

Window_ItemWeight.prototype.drawItemWeight = function(rect) {
    var align = 'left'
    let itemWeight = '0';
    var maxWidth = Graphics.boxWidth / 2;
    if(SceneManager._scene._itemWindow.active && SceneManager._scene._itemWindow.item()) {
        itemWeight = '1';
        item = SceneManager._scene._itemWindow.item();
        if(item.meta.itemWeight) {
            itemWeight = item.meta.itemWeight;
        }
    }
    this._text = Dungeonmind.LI.itemWeightText + '(' + itemWeight + ')';
    var x = Graphics.boxWidth / 2 - this.contents.measureTextWidth(this._text) / 2 - 16;
    this.drawText(this._text, x+32, 0, maxWidth, align);
    this.drawIcon(Dungeonmind.LI.itemWeightIcon, x, 0);
};

//-----------------------------------------------------------------------------
// Scene_Shop
//
// *overwritten method

Scene_Shop.prototype.createCategoryWindow = function() {
    const rect = this.categoryWindowRect();
    if($gameContainers.dmItemCategoryPluginCheck()) {
      this._categoryWindow = new Window_ItemDMCategory(rect);
    } else {
      this._categoryWindow = new Window_ItemCategory(rect);
    }
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.hide();
    this._categoryWindow.deactivate();
    this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler("cancel", this.onCategoryCancel.bind(this));
    this.addWindow(this._categoryWindow);
};

