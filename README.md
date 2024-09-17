# TheSkyLib Online

Generates a Skylanders figure dump using a specific UID from an empty card dump.

### How to Use:

1. You need to **export your empty NFC tag** to a .dump file.
  - _If you are on **Android**, watch this **[video](https://www.youtube.com/watch?v=hhT0tAHdcMc)**_.
  - _If you are on **Windows** with **ACR122U**, open "**[Mifare Windows Tool v1.6](https://github.com/ElDavoo/Mifare-Windows-Tool-Reborn)**_"
  - _Place an **empty tag** on the **ACR122U** reader_.
  - _Inside **Mifare Windows Tool v1.6**, click on "**READ TAG**_"
  - _Select "**std.keys**" and click on "**Start Decode & Read tag**"._
  - _Wait a moment. If you receive any **warnings**, **unplug and plug the USB cable** of the reader back in, then try again_.
  - _When done, you should see a popup window, with repeating green **FFFFFFFFFFFF** keys and a lot of **white 0**_.
  - _At the bottom of this window, click on "**Save Dump as**"_.
  - _Give it a name that you would recognize (mine will be **Empty_Tag_1**). Don't manually type file extensions. MWT will add .dump extension for you._
  - _Now this newly created "**Empty_Tag_1.dump**" file is your empty card dump. You will need it for "**TheSkyLib-Online**" software_.
2. You will also need some **Skylanders dump files**.
  - _You can get those from the **[Skylanders Ultimate NFC Pack](https://skylandersnfc.github.io/Skylanders-Ultimate-NFC-Pack/)**_
3. Choose the exported **empty tag dump** on the first "**Choose blank dump...**" button.
4. Choose a desired **Skylander dump** on the second "**Choose toy dump...**" button.
5. A "**Download**" button will appear from which you can download the modified Skylander dump for this specific card.
6. **Write** this modified dump with **Mifare Windows Tool** or **Android MIFARE Classic Tool** on the **same empty tag** which you've used in Step 1.
  - _**Don't write it to other cards**, as it won't work._
  - _You need to follow this process for **each different UID-locked card**._
  - _You will **still write 63 out of 64 blocks** with MWT. **That's alright**._

### Software Variants:

#### Refactored version : [https://skylandersnfc.github.io/TheSkyLib-Online/](https://skylandersnfc.github.io/TheSkyLib-Online/)

#### Original version: [https://fzcobp.csb.app/](https://fzcobp.csb.app/)

#### Original idea: [https://github.com/DevZillion/TheSkyLib](https://github.com/DevZillion/TheSkyLib)
