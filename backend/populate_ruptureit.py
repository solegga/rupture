from string import ascii_lowercase
import django
import os
import string

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from breach.models import Target, Victim

endpoint = 'https://ruptureit.com/test.php?reflection=%s'
prefix = 'imper'
alphabet = ascii_lowercase
secretlength = 9

target_1 = Target(
    endpoint=endpoint,
    prefix=prefix,
    alphabet=alphabet,
    secretlength=secretlength,
    alignmentalphabet=string.ascii_uppercase,
    recordscardinality=1
)
target_1.save()

print 'Created Target:\n\tendpoint: {}\n\tprefix: {}\n\talphabet: {}\n\tsecretlength: {}'.format(endpoint, prefix, alphabet, secretlength)

snifferendpoint = 'http://127.0.0.1:9000'
sourceip = '192.168.1.22'

victim_1 = Victim(
    target=target_1,
    snifferendpoint=snifferendpoint,
    sourceip=sourceip,
    method=Victim.SERIAL
)
victim_1.save()

print 'Created Victim:\n\tvictim_id: {}\n\tsnifferendpoint: {}\n\tsourceip: {}'.format(victim_1.id, snifferendpoint, sourceip)
