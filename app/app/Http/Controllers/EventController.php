<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventStoreRequest;
use App\Http\Requests\EventUpdateRequest;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->date) {
            $events = Event::select('id', 'title', 'description', 'location', 'time', 'date', 'type')->where('date', $request->date)->get();
        } else {
            $events = Event::select('date AS startDate', 'date AS endDate', 'type')->get();
        }
        return response()->json($events);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(EventStoreRequest $request)
    {
        $event = Event::create($request->all());
        return response()->json(['success' => 1, 'id' => $event->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = Event::find($id);
        return response()->json($event);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EventUpdateRequest $request, string $id)
    {
        $event = Event::find($id);
        $event->update($request->all());
        return response()->json(['success' => 1]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Event::find($id);
        $event->delete();
        return response()->json(['success' => 1]);
    }
}
