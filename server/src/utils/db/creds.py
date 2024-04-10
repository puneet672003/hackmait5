""" 
function: insert_user (username: str, password: str) -> None
    # password: hashed form
    # insert in creds collection

    # exceptions: 
        conflict: username already exists
        cannot insert in database

function: update_user (username: str, password: str) -> 
    # password: hashed form
    # update in creds collection

    # exceptions: 
        cannot update in database


function: fetch_user (username: str) -> dict
    # fetch user from creds collection

    # exception: 
        not found: no document with username: username
"""
