# SecureChat
A web session based, end to end encrypted chat service

Frontend only example hosted statically at https://super-cool-site-by-joshuatrevor.netlify.app/
- To decrypt default messages, enter "blahblah123" in the "private key" field.
- Anything entered into the channel will be encrypted with whatever is in the "private key" field
- Messages will only be legible when the private key field of the viewer contains the same private key they were sent with.

An example use case is:
Fred meets with Andrew about something sensitive and they decide they'd like to keep in touch. They decide on a random key in person, each person writes it down and takes home a copy. Fred can now message Andrew the details of a SecureChat channel on an unencrypted platform. After joining the channel and entering the private key they exchanged earlier, both users can communicate freely and securely, without having to store any unencrypted or sensitive information on their device or the SecureChat server.

While more cumbersome, by delegating the key exchange to users a new level of trustlessness and information security becomes possible for a purely web-based communication platform.
