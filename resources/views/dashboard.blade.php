<x-app-layout>
    <div id="frame">
        @include('layouts.sidebar')
        <div class="content">
            <div class="blank-wrap">
                <div class="inner-blank-wrap">Select a contact to start messaging</div>
            </div>
            <div class="loader d-none">
                <div class="loader-inner">
                    <l-line-spinner
                    size="40"
                    stroke="3"
                    speed="1"
                    color="black"></l-line-spinner>
                </div>
            </div>
            <div class="contact-profile">
                <img src="{{ asset('images/avatar.png') }}" alt="" />
                <div>
                    <span class="contact-name"></span>
                </div>
                <div class="social-media">
                </div>
            </div>
            <div class="messages">
                <ul>
                    <x-message class="sent" text='hello' />
                    <x-message class="replies" text='hi' />
                            
                </ul>
            </div>
            <div class="message-input">
                <form action="" method="post" class="message-form">
                    @csrf
                    <div class="wrap">
                        <input type="text" name="message" autocomplete="off" placeholder="Write your message..." class="message-box" />
                        <button class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <x-slot name='scripts'>
        @vite(['resources/js/app.js','resources/js/message.js'])
    </x-slot>

</x-app-layout>