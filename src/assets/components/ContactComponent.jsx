import React, { useState } from 'react';

const ContactComponent = () => {
    const [loading, setLoading] = useState(false);
    const [sendMsg, setSendMsg] = useState("");
    const [errors, setErrors] = useState({});

    const contactScriptURL =
        "https://script.google.com/macros/s/AKfycbxliASTLxM9LVwXMQfc7yV0llY5C2VZHV9pV2052tPBm-ajFdTbe8cFqAMz_s2zDnvT/exec"; 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const firstName = formData.get("first-name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const message = formData.get("message");

        // Validation
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = "Name is required!";
        if (!email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/))
            newErrors.email = "Valid email is required!";
        if (!phone.match(/^[0-9]{10}$/))
            newErrors.phone = "A valid 10-digit phone number is required.";
        if (!message.trim()) newErrors.message = "Message is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const response = await fetch(contactScriptURL, {
                method: "POST",
                body: new URLSearchParams(formData),
            });

            if (response.ok) {
                setSendMsg("Thank You For Contacting Us!");
                e.target.reset();
            } else {
                throw new Error("Network response was not ok.");
            }
        } catch (error) {
            console.error("Error!", error.message);
            setSendMsg("Thank You For Contacting Us!");
            e.target.reset();
        } finally {
            setLoading(false);
            setTimeout(() => setSendMsg(""), 5000);
        }
    };


    return (
        <>
         
            <div className="footer-cont" id="footer-cont">
                <form
                    className="footer"
                    onSubmit={handleSubmit}
                    action={contactScriptURL}
                    name="message-to-google-sheet"
                    method="POST"
                >
                    <p className="send-message">Get in touch with us</p>
                    <fieldset>
                        <label htmlFor="first-name">
                            Enter Your Name:
                            <input
                                id="first-name"
                                name="first-name"
                                type="text"
                                placeholder="Enter name"
                            />
                            {errors.firstName && (
                                <p className="error-message">{errors.firstName}</p>
                            )}
                        </label>

                        <label htmlFor="email">
                            Enter Your Email:
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter email"
                            />
                            {errors.email && (
                                <p className="error-message">{errors.email}</p>
                            )}
                        </label>

                        <label htmlFor="phone">
                            Enter Phone Number:
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="0765216787"
                            />
                            {errors.phone && (
                                <p className="error-message">{errors.phone}</p>
                            )}
                        </label>

                        <label htmlFor="message">
                            Message:
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                cols="10"
                                placeholder="Your Enquiry"
                            />
                            {errors.message && (
                                <p className="error-message">{errors.message}</p>
                            )}
                        </label>
                    </fieldset>

                    <input
                        type="submit"
                        value={loading ? "Submitting..." : "Submit"}
                        name="send-message"
                        className="submit-btn"
                        disabled={loading}
                    />
                    {sendMsg && <p style={{marginTop: '1em', color: 'green', fontWeight: '500'}} className="send-msg">{sendMsg}</p>}
                    <p style={{ color: 'rgb(24, 117, 24)', marginTop: '10px', fontWeight: '600' }} id="sendmsg"></p>
                </form>
            </div>

        </>
    );
};

export default ContactComponent;