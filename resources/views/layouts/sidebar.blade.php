<div id="sidepanel">
            <div id="profile">
                <div class="wrap">
                    <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" class="online" alt="" />
                    <p>{{ auth()->user()->name }}</p>
                    <i class="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                    <div id="status-options">
                        <ul>
                            <li id="status-online" class="active"><span class="status-circle"></span>
                                <p>Online</p>
                            </li>
                            <li id="status-away"><span class="status-circle"></span>
                                <p>Away</p>
                            </li>
                            <li id="status-busy"><span class="status-circle"></span>
                                <p>Busy</p>
                            </li>
                            <li id="status-offline"><span class="status-circle"></span>
                                <p>Offline</p>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
               <hr> 
            <div id="contacts">
                <ul>
                    @forelse($users as $user)
                    <li class="contact" data-id="{{$user->id}}">
                        <div class="wrap">
                            <span class="contact-status offline"></span>
                            <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                            <div class="meta">
                                <p class="name">{{ $user->name }}</p>
                                <p class="preview">{{ $user->email }}</p>
                            </div>
                        </div>
                    </li>
                    @empty
                    <ul>
                        <li class="contact">
                            <div class="wrap">
                                <p>No Users Found</p>
                            </div>
                        </li>
                    </ul>
                    @endforelse

                </ul>
            </div>

            <div style="text-align: center;">
                <form action="{{ route('logout') }}" method="post">
                    @csrf
                    <button type="submit" style="background-color: red; padding: 5px 8px; border:none; border-radius:3px">Logout</button>
                </form>
            </div>

          
        </div>