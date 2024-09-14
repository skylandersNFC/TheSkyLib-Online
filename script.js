window.onload = function () {
    class t {
        constructor(t, e) {
            this.TWO_PWR_16_DBL = 65536,
            this.TWO_PWR_32_DBL = this.TWO_PWR_16_DBL * this.TWO_PWR_16_DBL,
            this.TWO_PWR_64_DBL = this.TWO_PWR_32_DBL * this.TWO_PWR_32_DBL,
            this.low = 0 | t,
            this.high = 0 | e
        }
        fromNumber(e) {
            return e < 0 ? this.fromNumber(-e).neg() : new t(e % this.TWO_PWR_32_DBL | 0, e / this.TWO_PWR_32_DBL | 0)
        }
        neg() {
            return new t(~this.low, ~this.high).add(new t(1, 0))
        }
        add(e) {
            var n = this.high >>> 16,
            r = 65535 & this.high,
            i = this.low >>> 16,
            o = 65535 & this.low,
            l = e.high >>> 16,
            h = 65535 & e.high,
            a = e.low >>> 16,
            s = 0,
            u = 0,
            d = 0,
            w = 0;
            return d += (w += o + (65535 & e.low)) >>> 16,
            u += (d += i + a) >>> 16,
            s += (u += r + h) >>> 16,
            s += n + l,
            new t((d &= 65535) << 16 | (w &= 65535), (s &= 65535) << 16 | (u &= 65535))
        }
        shiftLeft(e) {
            return 0 == (e &= 63) ? this : e < 32 ? new t(this.low << e, this.high << e | this.low >>> 32 - e) : new t(0, this.low << e - 32)
        }
        xor(e) {
            return new t(this.low ^ e.low, this.high ^ e.high)
        }
        and(e) {
            return new t(this.low & e.low, this.high & e.high)
        }
        equals(t) {
            return this.high === t.high && this.low === t.low
        }
        toBytesLE() {
            var t = this.high,
            e = this.low;
            return [255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24, 255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24]
        }
        toBytesBE() {
            var t = this.high,
            e = this.low;
            return [t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t, e >>> 24, e >>> 16 & 255, e >>> 8 & 255, 255 & e]
        }
    }
    var e = [2, 3, 73, 1103, 2017, 560381651, 12868356821];
    function n(n, r) {
        if (0 === r)
            return (new t).fromNumber(e[2] * e[4] * e[5]).toBytesBE().slice(2);
        var i = e[0] * e[0] * e[1] * e[3] * e[6],
        o = new Uint8Array(n.length + 1);
        o.set(n),
        o.set(new Uint8Array([r]), n.length);
        var l = function (e, n) {
            e = (new t).fromNumber(e);
            var r = new t(2850698899, 1123082731),
            i = new t(0, 32768),
            o = new t(4294967295, 65535);
            for (let h = 0; h < n.length; h++) {
                var l = (new t).fromNumber(n[h]).shiftLeft(40);
                e = e.xor(l);
                for (let t = 0; t < 8; t++)
                    e = (e = e.and(i).equals(i) ? (e = e.shiftLeft(1)).xor(r) : e.shiftLeft(1)).and(o)
            }
            return e
        }
        (i, o);
        return l.toBytesLE().slice(0, 6)
    }
    function r(e, r, i) {
        var o = new Uint8Array(1024);
        o.set(e, 0),
        o[17] = r[0],
        o[16] = r[1],
        o[29] = i[0],
        o[28] = i[1];
        var l = function (t) {
            let e = 65535;
            for (let n = 0; n < 30; n++) {
                let r = t[n];
                for (let t = 0; t < 8; t++) {
                    const n = 1 == (e >> 15 & 1);
                    e <<= 1,
                    n ^ 1 == (r >> 7 - t & 1) && (e ^= 4129)
                }
            }
            e &= 65535;
            var n = new Uint8Array(2);
            return n[0] = 255 & e,
            n[1] = e >> 8 & 255,
            n
        }
        (o);
        o[30] = l[0],
        o[31] = l[1];
        var h = 0;
        for (let r = 48; r < o.length; r += 64) {
            let i = n(e.slice(0, 4), h);
            for (let t = 0; t < i.length; t++)
                o[r + t] = i[t];
            let l = (new t).fromNumber(0 === h ? 4278681705 : 2131691625).toBytesBE().slice(4);
            for (let t = 0; t < l.length; t++)
                o[r + 6 + t] = l[t];
            h++
        }
        return o
    }
    var i = null,
    o = document.getElementById("dumpBlank");
    o.addEventListener("change", (function (t) {
            var e = o.files[0];
            let n = document.getElementById("labelBlank");
            n.textContent = e.name.substring(0, 20) + "...",
            n.title = e.name;
            var r = new FileReader;
            r.onload = function (t) {
                i = new Uint8Array(16);
                for (let t = 0; t < i.length; t++)
                    i[t] = r.result.charCodeAt(t);
                i && l && (a.style.display = "inline")
            },
            r.readAsBinaryString(e)
        }));
    var l = null,
    h = document.getElementById("dumpToy");
    h.addEventListener("change", (function (t) {
            var e = h.files[0];
            let n = document.getElementById("labelToy");
            n.textContent = e.name.substring(0, 20) + "...",
            n.title = e.name;
            var r = new FileReader;
            r.onload = function (t) {
                l = new Uint8Array(16);
                for (let t = 0; t < l.length; t++)
                    l[t] = r.result.charCodeAt(t + 16);
                i && l && (a.style.display = "inline")
            },
            r.readAsBinaryString(e)
        }));
    var a = document.getElementById("download");
    a.addEventListener("click", (function (t) {
            if (a.removeAttribute("download"), a.removeAttribute("href"), i && l) {
                let t = Array.from(i.slice(0, 4)).map((t => t.toString(16).padStart(2, "0"))).join(""),
                e = l.slice(0, 2).reverse(),
                n = Array.from(e).map((t => t.toString(16).padStart(2, "0"))).join(""),
                o = l.slice(12, 14).reverse(),
                h = Array.from(o).map((t => t.toString(16).padStart(2, "0"))).join(""),
                s = r(i, e, o);
                a.download = t + "_" + n + "_" + h + ".dump",
                a.href = function (t) {
                    var e = new Blob([t], {
                        type: "application/octet-stream"
                    });
                    return window.URL.createObjectURL(e)
                }
                (s)
            }
        }))
};