import json, subprocess, sys

def parse_export(s):
    lines = s.split('\n')
    var_list = []
    for l in lines:
        var_list.append( l.split(" ")[-1] )
    return var_list

def parse_envvars(l):
    pairs = []
    for pair in l:
        k,v = pair.split("=", 1)
        if v.startswith('"') and v.endswith('"'):
            v = v[1:-1]
        pairs.append((k,v))
    return pairs


def err_exit(msg):
    sys.stderr.write(msg)
    sys.stderr.flush()
    sys.exit(1)

if __name__ == "__main__":
    data_in = json.loads(sys.stdin.read())['data']
    # Get the environment prior to sourcing the envfile data
    baseline_envvars = subprocess.check_output(['bash', '-c', 'export'])
    baseline_envvars = set(parse_export(baseline_envvars.decode('utf-8')))

    command = [
            'bash', '-c',
            'set -a; source <( cat << EOT\n%s\nEOT\n); export' % data_in
            ]
    # Get environment AFTER sourcing data
    new_envvars = subprocess.check_output(command)
    new_envvars = set(parse_export(new_envvars.decode('utf-8')))

    delta_envvars = new_envvars.difference(baseline_envvars)

    kv_pairs = dict(parse_envvars(delta_envvars))

    sys.stdout.write(json.dumps(kv_pairs))
    sys.stdout.flush()
