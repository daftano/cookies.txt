"""genreate domain_list.js from http://mxr.mozilla.org/mozilla-central/source/netwerk/dns/effective_tld_names.dat?raw=1
save that to file effective_tld_names.dat.txt and run this
"""

fd = open("effective_tld_names.dat.txt","r")
wd = open("domain_list.js","w")
wd.write("var domainlist = {\n")

for line in fd:
	line = line.strip()
	if len(line) > 1 and not line.startswith("//"):
		wd.write("\t\""+line+"\":1,\n")

wd.write("}\n")
fd.close()
wd.close()