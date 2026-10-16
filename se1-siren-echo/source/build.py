import json, base64, mimetypes
V = '/home/claude/v19/'
def uri(p):
    m = 'image/webp' if p.endswith('.webp') else 'image/png'
    return f'data:{m};base64,' + base64.b64encode(open(p, 'rb').read()).decode()
imgs = {'panel': V + 'njd_panel_v20.png', 'lamp': V + 'njd_lamp_on_v13.png', 'btnOff': V + 'button_off.png', 'btnOn': V + 'button_on.png',
        'togOff': V + 'toggle_off.png', 'togOn': V + 'toggle_on.png', 'strip': 'se1_strip.png',
        'hhPlate': 'hh_plate.webp', 'hhKnob': 'hh_knob.png', 'hhCap': 'hh_cap.png'}
t = open('page_template.html').read()
t = t.replace('__LAYOUT__', json.dumps(json.load(open('layout.json'))))
t = t.replace('__IMAGES__', json.dumps({k: uri(p) for k, p in imgs.items()}))
t = t.replace('__ENGINE__', json.dumps(open('se1_engine.js').read() + '\n' + open('hh_engine.js').read()))
open('se1-siren-echo.html', 'w').write(t)
w = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>' + t + '</body></html>'
open('wrap.html', 'w').write(w)
print(len(t) // 1024, 'KB')
