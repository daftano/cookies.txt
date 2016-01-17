import urllib
url = "https://publicsuffix.org/list/effective_tld_names.dat?raw=1"
tld_names = "effective_tld_names.dat"
domain_list = "../src/domain_list.js"
response = urllib.urlretrieve(url, tld_names)

fd = open(tld_names,"r")
wd = open(domain_list,"w")
wd.write("var domainlist = {\n")

for line in fd:
	line = line.strip()
	if len(line) > 1 and not line.startswith("//"):
		wd.write("\t\""+line+"\":1,\n")

wd.write("};\n")
fd.close()
wd.close()
