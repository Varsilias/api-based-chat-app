<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $sender_id;

    public string $message;

    public string $receiver_id;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($sender_id, $message, $receiver_id)
    {
        $this->sender_id = $sender_id;
        $this->message = $message;
        $this->receiver_id = $receiver_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn(): Channel|array
    {
        return [
            new PrivateChannel("chat-{$this->receiver_id}"),
            new PrivateChannel("chat-{$this->sender_id}")
        ];
    }

    public static function broadcastAs(): string
    {
        return 'message';
    }
}
