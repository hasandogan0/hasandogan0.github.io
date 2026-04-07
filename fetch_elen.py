import urllib.request
import re

url = "https://preview.colorlib.com/theme/elen/"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    print("CSS Links:", re.findall(r'href="([^"]+\.css)"', html))
    
    # Try to grab a snippet of the body to understand the layout
    body_match = re.search(r'<body[^>]*>([\s\S]*?)<script', html)
    if body_match:
        body_content = body_match.group(1)[:2000] # First 2000 chars of body
        print("\nBody Snippet:\n", body_content)
    else:
        print("Body not found.")
except Exception as e:
    print("Error:", e)
